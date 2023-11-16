

const readline = require('readline');
const { readData, writeData } = require('./utils/storage');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('\nWelcome to the Task Manager Application!');
  console.log('----------------------------------------');
  console.log('1. View tasks');
  console.log('2. Create a new task');
  console.log('3. Search for a task');
  console.log('4. Edit a task');
  console.log('5. Delete a task');
  console.log('6. Exit');
  console.log('----------------------------------------');
}

function getUserChoice() {
  return new Promise(resolve => {
    rl.question('\nEnter your choice: ', choice => {
      resolve(choice);
    });
  });
}

async function handleUserChoice(choice) {
  try {
    let data = await readData();

    if (isNaN(choice) || !Number.isInteger(Number(choice))) {
      console.log('Error: Please enter a valid number.');
      return;
    }

    switch (choice) {
      case '1':
        // View tasks-------------------------------------------------------------------
        console.log(' ');

        if (data && data.length > 0) {
          data.forEach((task, index) => {
            console.log(`${index + 1}. ${task.title} - ${task.description}`);
          });
          // Wait for user to press Enter
          await new Promise(resolve => {
            rl.question('', () => {
              resolve();
            });
          });
        } else {
          console.log('No tasks available.');
        }
        break;
        
      case '2':
        // Create a new task----------------------------------------------------------------
        
        const newTaskTitle = await getUserInput('Enter the task title: ');
        const newTaskDescription = await getUserInput('Enter the task description: ');

        // Create a new task object
        const newTask = {
          title: newTaskTitle,
          description: newTaskDescription,
        };

        // Add the new task
        data.push(newTask);

        await new Promise(resolve => {
            rl.question('', () => {
              resolve();
            });
        });
        break;
      case '3':
        //Search for a task-----------------------------------------------------------------
        const searchKeyword = await getUserInput('Enter search keyword: ');

        // Filter keywoard
        const matchingTasks = data.filter(task =>
            task.title.includes(searchKeyword) || task.description.includes(searchKeyword)
        );

        // Display matching tasks
        if (matchingTasks.length > 0) {
            console.log('\nSearch result');
            matchingTasks.forEach((task, index) => {
                const highlightedTitle = task.title.replace(new RegExp(searchKeyword, 'gi'), `**${searchKeyword}**`);
                const highlightedDescription = task.description.replace(new RegExp(searchKeyword, 'gi'), `**${searchKeyword}**`);
                console.log(`${index + 1}. ${highlightedTitle} - ${highlightedDescription}`);
            });
        } else {
        console.log('No tasks found matching the keyword.');
        }
        break;
      case '4':
        // Edit a task--------------------------------------------------------------------------
        console.log('\nEditing a Task');
        console.log('------------------');
        console.log('List of tasks:');

        if (data && data.length > 0) {
            data.forEach((task, index) => {
              console.log(`${index + 1}. ${task.title} - ${task.description}`);
            });
          }

        // Prompt user for task index to edit
        const editIndex = parseInt(await getUserInput('\nEnter the tasks number you want to edit: '), 10);
        
        if (isNaN(editIndex - 1) || (editIndex - 1) < 0 || (editIndex - 1) >= data.length) {
          console.log('Error: Invalid index.');
          break;
        }
        console.log('Enter new title (leave blank to keep current):')
        const newTitle = await getUserInput('\nCurrent title: ');
        const newDescription = await getUserInput('Enter a new description (leave blank to keep current): ');

        // Update the task 
        if (newTitle !== '') {
          data[editIndex - 1].title = newTitle;
        }

        if (newDescription !== '') {
          data[editIndex - 1].description = newDescription;
        }

        console.log('Task updated successfully!');
        // Prompt user to press any key
        await new Promise(resolve => {
            rl.question('\nPress any key to return to the main menu...', () => {
                resolve();
            });
        });
        break;
      case '5':
        // Delete a task------------------------------------------------------------------------------
        console.log('Delting a Task');
        console.log('----------------');
        console.log('List of tasks:');
        console.log(' ');

        if (data && data.length > 0) {
            data.forEach((task, index) => {
              console.log(`${index + 1}. ${task.title} - ${task.description}`);
            });
          }

        // Prompt user for task index to delete
        const deleteIndex = parseInt(await getUserInput('\nEnter the index of the task to delete: '), 10);
        const IndexNumber = deleteIndex - 1;
        if (isNaN(IndexNumber) || IndexNumber < 0 || IndexNumber >= data.length) {
          console.log('Error: Invalid index.');
          break;
        }
        // Prompt user to confirm deletion
        console.log(`\nYou choosen to delete the task: "${data[IndexNumber].title}".`);
        const confirmDeletion = await getUserInput('Are you sure you want to delete this task? (yes/no): ');

        if (confirmDeletion.toLowerCase() === 'yes') {
          // Remove the task from the array
          const deletedTask = data.splice(IndexNumber, 1);
          console.log('\nTask deleted successfully!');
        } else {
          console.log('Task deletion canceled.');
        }
        await new Promise(resolve => {
            rl.question('\nPress any key to return to the main menu...', () => {
                resolve();
            });
        });
        break;
      case '6':
        // Exit------------------------------------------------------------------------------------------
        console.log('Goodbye!');
        rl.close();
        process.exit(0);
        break;
      default:
        console.log('Error: Please enter a valid option number (1-6).');
    }

    await writeData(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to get user input
function getUserInput(question) {
    return new Promise(resolve => {
      rl.question(question, answer => {
        resolve(answer);
      });
    });
  }

async function runApp() {
  while (true) {
    displayMenu();
    const userChoice = await getUserChoice();
    await handleUserChoice(userChoice);
  }
}

runApp();
