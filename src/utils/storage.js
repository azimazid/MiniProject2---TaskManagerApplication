const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

async function readData() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return jsonData;
  } catch (error) {
    console.error('Error reading data:', error.message);
    return null;
  }
}

async function writeData(data) {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonString, 'utf-8');
    //console.log('Data written successfully to tasks.json');
  } catch (error) {
    console.error('Error writing data:', error.message);
  }
}

module.exports = { readData, writeData };