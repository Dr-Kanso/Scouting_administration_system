import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  HStack,
} from '@chakra-ui/react';

export default function SessionPlanner() {
  const [form, setForm] = useState({
    leader: '',
    group: '',
    date: '',
    title: '',
    badges: '',
    objectives: '',
    intro: '',
    islamic: '',
    body: '',
    activities: '',
    equipment: '',
    conclusion: '',
    www: '',
    ebi: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box maxW="1000px" mx="auto" p={8}>
      <Heading mb={6} color="purple.700">🧭 Session Planner</Heading>
      <VStack spacing={4} align="stretch">

        <HStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Leader's Name</FormLabel>
            <Input name="leader" value={form.leader} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Group</FormLabel>
            <Select name="group" value={form.group} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Beavers">Beavers</option>
              <option value="Cubs">Cubs</option>
              <option value="Scouts">Scouts</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Date</FormLabel>
            <Input type="date" name="date" value={form.date} onChange={handleChange} />
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Session Title</FormLabel>
          <Input name="title" value={form.title} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Badge(s) Covered</FormLabel>
          <Input name="badges" value={form.badges} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Objectives</FormLabel>
          <Textarea name="objectives" value={form.objectives} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Introductory Points</FormLabel>
          <Textarea name="intro" value={form.intro} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Islamic Principles (integrated)</FormLabel>
          <Textarea name="islamic" value={form.islamic} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Main Body</FormLabel>
          <Textarea name="body" value={form.body} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Activities Overview</FormLabel>
          <Textarea name="activities" value={form.activities} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Equipment Needed (include costs)</FormLabel>
          <Textarea name="equipment" value={form.equipment} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Conclusive Statement</FormLabel>
          <Textarea name="conclusion" value={form.conclusion} onChange={handleChange} />
        </FormControl>

        <HStack spacing={4}>
          <FormControl>
            <FormLabel>What Went Well (WWW)</FormLabel>
            <Textarea name="www" value={form.www} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Even Better If (EBI)</FormLabel>
            <Textarea name="ebi" value={form.ebi} onChange={handleChange} />
          </FormControl>
        </HStack>

        <HStack spacing={4} pt={4}>
          <Button colorScheme="purple">💾 Save</Button>
          <Button colorScheme="green">⬇️ Export as Word</Button>
          <Button colorScheme="gray" variant="outline" onClick={() => setForm({ ...form, ...Object.fromEntries(Object.keys(form).map(key => [key, ''])) })}>
            🔁 Reset
          </Button>
        </HStack>

      </VStack>
    </Box>
  );
}
