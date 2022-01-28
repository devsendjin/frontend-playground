import { Sample } from '@/components/layouts/Sample';
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
    <Sample>
      <Sample.Col col={5}>
        <Accordion>
          {content.map(({ question, answer }, index) => (
            <Accordion.Item key={index} itemIndex={index}>
              <Accordion.Toggle itemIndex={index}>{question}</Accordion.Toggle>
              <Accordion.Content itemIndex={index}>{answer}</Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion>
      </Sample.Col>
    </Sample>
  );
};

AccordionSample.displayName = 'AccordionSample';

export { AccordionSample };
