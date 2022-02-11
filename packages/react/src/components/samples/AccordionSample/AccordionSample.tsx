import { Accordion } from '@/components/UI/Accordion';

const content = [
  {
    question: 'What is your name?',
    answer: 'Sir Galahad of Camelot.',
  },
  {
    question: 'What is your quest?',
    answer: 'I seek the Grail.',
  },
  {
    question: 'What is your favorite color?',
    answer: 'Blue. No, yellooooow!',
  },
];

const AccordionSample: React.FC = () => {
  return (
    <Accordion style={{ maxWidth: 350 }}>
      {content.map(({ question, answer }, index) => (
        <Accordion.Item key={index} itemKey={index}>
          <Accordion.Toggle itemKey={index}>{question}</Accordion.Toggle>
          <Accordion.Content itemKey={index}>{answer}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

AccordionSample.displayName = 'AccordionSample';

export { AccordionSample };
