import { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

// Helper function to fetch image as base64
async function getImageBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

// Helper function to fetch image dimensions
async function getImageDimensions(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => resolve({ width: 100, height: 100 }); // Default dimensions
    img.src = url;
  });
}

export async function exportMemberBadgeReport(member, badges) {
  const sections = [];

  // Title section
  sections.push(
    new Paragraph({
      text: `Badge Progress Report`,
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 }
    })
  );

  // Member information
  sections.push(
    new Paragraph({
      text: `Member: ${member.firstName} ${member.lastName}`,
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 200 }
    })
  );

  sections.push(
    new Paragraph({
      text: `Section: ${member.section}`,
      spacing: { after: 200 }
    })
  );

  if (member.dateOfBirth) {
    const dob = member.dateOfBirth?.toDate ? member.dateOfBirth.toDate() : new Date(member.dateOfBirth);
    sections.push(
      new Paragraph({
        text: `Date of Birth: ${dob.toLocaleDateString()}`,
        spacing: { after: 200 }
      })
    );
  }

  sections.push(
    new Paragraph({
      text: `Report Generated: ${new Date().toLocaleDateString()}`,
      spacing: { after: 400 }
    })
  );

  // Badges section
  sections.push(
    new Paragraph({
      text: 'Badges Earned',
      heading: HeadingLevel.HEADING_2,
      spacing: { after: 300 }
    })
  );

  if (!badges || badges.length === 0) {
    sections.push(
      new Paragraph({
        text: 'No badges earned yet.',
        spacing: { after: 200 }
      })
    );
  } else {
    // Create badges with icons
    for (const badge of badges) {
      const badgeSection = [];

      // Badge name
      badgeSection.push(
        new Paragraph({
          text: badge.name,
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 100 }
        })
      );

      // Try to add badge icon if available
      if (badge.image) {
        try {
          const imageBase64 = await getImageBase64(badge.image);
          if (imageBase64) {
            badgeSection.push(
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBase64,
                    transformation: {
                      width: 80,
                      height: 80
                    }
                  })
                ],
                spacing: { after: 100 }
              })
            );
          }
        } catch (error) {
          console.error(`Error adding image for badge ${badge.name}:`, error);
        }
      }

      // Badge details
      if (badge.category) {
        badgeSection.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Category: ', bold: true }),
              new TextRun(badge.category)
            ],
            spacing: { after: 100 }
          })
        );
      }

      if (badge.stage) {
        badgeSection.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Stage: ', bold: true }),
              new TextRun(`${badge.stage}`)
            ],
            spacing: { after: 100 }
          })
        );
      }

      if (badge.dateAwarded) {
        const awardDate = badge.dateAwarded?.toDate ? badge.dateAwarded.toDate() : new Date(badge.dateAwarded);
        badgeSection.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Date Awarded: ', bold: true }),
              new TextRun(awardDate.toLocaleDateString())
            ],
            spacing: { after: 100 }
          })
        );
      }

      if (badge.overallProgress !== undefined) {
        badgeSection.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Progress: ', bold: true }),
              new TextRun(`${badge.overallProgress}%`)
            ],
            spacing: { after: 100 }
          })
        );
      }

      if (badge.requirements && badge.requirements.length > 0) {
        badgeSection.push(
          new Paragraph({
            text: 'Requirements:',
            bold: true,
            spacing: { before: 100, after: 50 }
          })
        );

        badge.requirements.forEach((req, index) => {
          badgeSection.push(
            new Paragraph({
              children: [
                new TextRun(`${index + 1}. ${req.description} - `),
                new TextRun({
                  text: req.completed ? '✓ Completed' : '○ Not completed',
                  bold: req.completed,
                  color: req.completed ? '008000' : '666666'
                })
              ],
              spacing: { after: 50 },
              indent: { left: 360 }
            })
          );
        });
      }

      sections.push(...badgeSection);

      // Add separator between badges
      sections.push(
        new Paragraph({
          text: '',
          spacing: { after: 200 },
          border: {
            bottom: {
              color: 'CCCCCC',
              space: 1,
              value: BorderStyle.SINGLE,
              size: 6
            }
          }
        })
      );
    }
  }

  // Create the document
  const doc = new Document({
    sections: [{
      properties: {},
      children: sections
    }]
  });

  // Generate and save the document
  try {
    const blob = await Packer.toBlob(doc);
    const fileName = `${member.firstName}_${member.lastName}_Badge_Report_${new Date().toISOString().split('T')[0]}.docx`;
    saveAs(blob, fileName);
    return true;
  } catch (error) {
    console.error('Error generating document:', error);
    return false;
  }
}

// Export badges to Excel format
export async function exportBadgesToExcel(members, section = 'All') {
  const XLSX = await import('xlsx');

  const worksheetData = [
    ['Badge Progress Report', '', '', '', ''],
    ['Section:', section, '', 'Generated:', new Date().toLocaleDateString()],
    ['', '', '', '', ''],
    ['Member Name', 'Badge Name', 'Category', 'Progress', 'Date Awarded']
  ];

  members.forEach(member => {
    if (member.badges && member.badges.length > 0) {
      member.badges.forEach(badge => {
        const dateAwarded = badge.dateAwarded
          ? (badge.dateAwarded?.toDate ? badge.dateAwarded.toDate() : new Date(badge.dateAwarded)).toLocaleDateString()
          : 'In Progress';

        worksheetData.push([
          `${member.firstName} ${member.lastName}`,
          badge.name || '',
          badge.category || '',
          badge.overallProgress !== undefined ? `${badge.overallProgress}%` : badge.status || '',
          dateAwarded
        ]);
      });
    } else {
      worksheetData.push([
        `${member.firstName} ${member.lastName}`,
        'No badges earned yet',
        '',
        '',
        ''
      ]);
    }
  });

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Badge Progress');

  // Set column widths
  const wscols = [
    { wpx: 150 }, // Member Name
    { wpx: 150 }, // Badge Name
    { wpx: 120 }, // Category
    { wpx: 80 },  // Progress
    { wpx: 100 }  // Date Awarded
  ];
  worksheet['!cols'] = wscols;

  // Generate and save the file
  XLSX.writeFile(workbook, `Badge_Progress_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
}