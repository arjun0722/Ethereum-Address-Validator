//*************************************************************/
//function pipe
//*************************************************************/


export const validation = (input) => {
  const regexedArr = input.map((addresses) =>
    addresses.replace(/^\s+|\s+$/g, "")
  );

  const checkvalidAdd = regexedArr.map((addresses, index) =>
    validateTrueAdd(addresses, index)
  );
  const checkvalidAmount = regexedArr.map((addresses, index) =>
    validateAmount(addresses, index)
  );
  const checkVlaidDuplicay = checkDuplicate(regexedArr);
 

 

  const errorMessages = [
    ...checkvalidAdd,
    ...checkvalidAmount,
    ...checkVlaidDuplicay,
  ];
 

  return errorMessages.filter((message) => {
    if (Array.isArray(message)) {
      return message.length > 0; 
    }

   return message !== true && message !== undefined;
  }); 
};
//*************************************************************/
// iavldiation regarding delimiters , address's length and amount//
//*************************************************************/

const validateTrueAdd = (addresses, index) => {
  const splitAdd = addresses.split("");
  const checkSplitAdd = `${splitAdd[0]}${splitAdd[1]}`;

  if (checkSplitAdd === "0x") {
    return true;
  } else {
    return `Line no ${index} ${addresses} invalid Ethereum address `;
  }
};

const validateAmount = (addresses, index) => {
  const delimiters = [" ", "=", ","];
  const regex = /^[0-9]+$/;
  let result = null;
  let errors = [];
  for (const delimiter of delimiters) {
    result = addresses.split(delimiter);
    if (result.length > 1) {
      break;
    }
  }

  if (result === null || result.length === 1) {
    errors.push(` Line ${index+1} invalid Ethereum delimiters & address`);
  }

  if (!regex.test(result[1])) {
    errors.push(` Line ${index+1} wrong amount`);
  }

  if (result[0].length !== 42) {
    errors.push(` Line ${index+1} invalid Ethereum address`);
  }

 
  if (errors.length > 0) {
    return errors;
  }

  return errors; 
};

//*************************************************************/
// Duplicate lines //
//*************************************************************/

const checkDuplicate = (addresses) => {
  const addressMap = new Map();
  const duplicateIndexMap = new Map();
  let error = [];

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];

    if (addressMap.has(address)) {
      const firstIndex = addressMap.get(address);
      if (!duplicateIndexMap.has(firstIndex)) {
        duplicateIndexMap.set(firstIndex, [{ index: firstIndex + 1, address }]);
      }
      duplicateIndexMap.get(firstIndex).push({ index: i + 1, address });
    } else {
      addressMap.set(address, i);
    }
  }

  const duplicateIndices = [];
  for (const indicesAndAddresses of duplicateIndexMap.values()) {
    duplicateIndices.push(indicesAndAddresses);
  }

  duplicateIndices.forEach((indicesAndAddresses) => {
    const indices = indicesAndAddresses.map((item) => item.index);
    const addresses = indicesAndAddresses.map((item) => item.address);
    error.push(`${addresses[0]} duplicate in Lines ${indices.join(", ")}`);
  });
  return error;
};

//*************************************************************/
// Remove duplicates//
//*************************************************************/


export const removeDuplicates = (addresses) => {
  
  const uniqueAddresses = new Set(); 
  const result = [];
  
  for (const address of addresses) {
    if (!uniqueAddresses.has(address)) {
      uniqueAddresses.add(address); 
      result.push(address); 
    }
  }
  
  return result;
};


//*************************************************************/
// combine the duplicated address amount//
//*************************************************************/

const addressMap = {};

export const combinedDuplicates=(addresses)=>{
  addresses.map((item, index) => {
    
    const match = item.match(/[^0-9a-zA-Z]/);
    const delimiter = match ? match[0] : '';

   
    const addressAndAmount = item.split(delimiter);
    const address = addressAndAmount[0];
    const amount = addressAndAmount[1];

    if (addressMap.hasOwnProperty(address)) {
        addressMap[address].amount += parseInt(amount);
    } else {
        addressMap[address] = { amount: parseInt(amount), delimiter };
    }
});


const combinedResult = Object.keys(addressMap).map((address) => {
    return `${address}${addressMap[address].delimiter}${addressMap[address].amount}`;
});
return combinedResult

}
