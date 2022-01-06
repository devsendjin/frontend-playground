import './index.scss';

// console.log('index');

/*
const isInt = (n) => {
  return Number(n) === n && n % 1 === 0;
};

const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

console.log('4 isFloat', isFloat(4));
console.log('4 isInt', isInt(4));
console.log('\n');
console.log('3.04 isFloat', isFloat(3.04));
console.log('3.04 isInt', isInt(3.04));
*/



const testArr = [
  [
      {
          "name": "dimensions",
          "label": "Dimensions",
          "measure": "mt",
          "isComplex": true,
          "id": "095f9eec-c86b-4d7f-9c9c-2610a5e3944f"
      },
      {
          "name": "quantity",
          "label": "Q-ty",
          "id": "4b4b9208-bd7a-4e02-833d-6ff8ac1da88b"
      },
      {
          "name": "cargoWeight",
          "label": "Gross weight",
          "measure": "st",
          "id": "b4d9e213-2a8f-4b8d-a85b-e0369be2301e"
      }
  ],
  [
      {
          "name": "dimensions",
          "label": "Dimensions",
          "measure": "mt",
          "isComplex": true,
          "id": "ce02787a-b913-40e5-80a8-d3e0e901c560"
      },
      {
          "name": "quantity",
          "label": "Q-ty",
          "id": "d4c3e9e3-1e2f-474c-8fe2-6c55ee228ea1"
      },
      {
          "name": "cargoWeight",
          "label": "Gross weight",
          "measure": "st",
          "id": "26c89710-3278-4293-b8d8-d71220b05ce6"
      }
  ],
  [
      {
          "name": "dimensions",
          "label": "Dimensions",
          "measure": "mt",
          "isComplex": true,
          "id": "f4953fe5-2853-475a-83d3-8eaf1ed463cf"
      },
      {
          "name": "quantity",
          "label": "Q-ty",
          "id": "c3431c29-3961-4285-b57d-4d9615e2508f"
      },
      {
          "name": "cargoWeight",
          "label": "Gross weight",
          "measure": "st",
          "id": "a14775b7-300a-43c2-a8bb-e1ee840b5efa"
      }
  ],
  [
      {
          "id": "915b3833-31d5-44d9-ab78-573057caf3f5",
          "name": "dimensions",
          "label": "Dimensions",
          "measure": "mt",
          "isComplex": true
      },
      {
          "id": "2e615bd6-4727-4f13-b1f9-279b8e847bab",
          "name": "quantity",
          "label": "Q-ty"
      },
      {
          "id": "89ebe994-9acf-414a-817c-0ba5d0184ebf",
          "name": "cargoWeight",
          "label": "Gross weight",
          "measure": "st"
      }
  ]
];

const chunk = testArr[0];
const field = chunk[1];
const flatted = testArr.flat();

// const index = flatted.indexOf(chunk[chunk.length-1]);
// const index = flatted.findIndex((item) => item.id === chunk[chunk.length-1].id);

// const index = flatted.findIndex((item) => chunk.some((chunkField) => item.id === chunkField.id));
// const item = flatted.find((item) => chunk.some((chunkField) => item.id === chunkField.id));
// console.log({chunk, field, index, item});

const rowIndex = testArr.indexOf(chunk);
