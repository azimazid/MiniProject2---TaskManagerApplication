# Mini Project 2 - Task Manager Application

[comment]: <this is the title of this project>
# Task Manager Application

[comment]: <this is description of project> 
## The objective of this project is to apply a comprehensive understanding of JavaScript acquired in the development of a console-based task management application. This application aims to facilitate essential operations, including task creation, viewing, editing, categorizing, searching, and deletion, all accessible through the console interface. The project emphasizes the adoption of best practices in version control using Git and GitHub, with a focus on procedural steps, from task initiation to code review. Furthermore, participants are encouraged to cultivate effective collaboration and time management skills while contributing to the project and adhering to task completion expectations. Additionally, the project emphasizes the importance of documentation preparation and the practice of thorough commenting on individual contributions.


[comment]: <>
### 1. Features
### 2. View Tasks
### 3. Create a New Task
### 4. Search for a Task
### 5. Edit a Task
### 6. Delete a Task
### 7. Exit


[comment]: <this is the lists feature functional> 
#### Lists
View Tasks (Option 1):
--Displays a list of tasks, including titles and descriptions.
--Waits for user input before returning to the main menu.

Create a New Task (Option 2):
--Prompts the user to enter a new task title and description.
--Adds the new task to the list.
--Waits for user input before returning to the main menu.

Search for a Task (Option 3):
--Asks the user to input a search keyword.
--Filters tasks containing the keyword in titles or descriptions.
--Displays matching tasks with the keyword highlighted.
--Handles cases where no tasks match the keyword.

Edit a Task (Option 4):
--Displays a list of tasks and prompts the user to choose a task by its number.
--Asks for a new title and description (allows leaving them blank).
--Updates the selected task with the new information.
--Notifies the user of successful task update.
--Waits for user input before returning to the main menu.

Delete a Task (Option 5):
--Displays a list of tasks and prompts the user to choose a task by its number.
--Asks for confirmation before deleting the selected task.
--Removes the task from the list if the user confirms.
--Notifies the user of successful task deletion or cancellation.
--Waits for user input before returning to the main menu.

Exit (Option 6):
--Displays a farewell message, closes the interface, and exits the application.

[comment]: <this is the user guidelines> 
### Usage
View Tasks (Option 1):
    --Enter 1 to view existing tasks.
    --If tasks are available, they will be displayed with their titles and descriptions.
    --Press Enter to return to the main menu.

Create a New Task (Option 2):
    --Enter 2 to create a new task.
    --Follow the prompts to enter the title and description of the new task.
    --Press Enter to return to the main menu.

Search for a Task (Option 3):
    --Enter 3 to search for tasks based on a keyword.
    --Enter the keyword when prompted.
    --Matching tasks will be displayed with the keyword highlighted.
    --Press Enter to return to the main menu.

Edit a Task (Option 4):
    --Enter 4 to edit an existing task.
    --Select a task by entering its number.
    --Follow the prompts to enter a new title and/or description.
    --Press Enter to return to the main menu.

Delete a Task (Option 5):
    --Enter 5 to delete an existing task.
    --Select a task by entering its number.
    --Confirm the deletion when prompted.
    --Press Enter to return to the main menu.

Exit (Option 6):
    --Enter 6 to exit the application.
    --A farewell message will be displayed, and the application will close.

#### Code

Block of Code (View tasks):
    console.log(' ');
            if (data && data.length > 0) {
              data.forEach((task, index) => {
                console.log(`${index + 1}. ${task.title} - ${task.description}`);
              });
              await new Promise(resolve => {
                rl.question('', () => {
                  resolve();
                });
              });
            } else {
              console.log('No tasks available.');
            }

Block of Code (Create a new task):
    const newTaskTitle = await getUserInput('Enter the task title: ');
            const newTaskDescription = await getUserInput('Enter the task description: ');
            const newTask = {
              title: newTaskTitle,
              description: newTaskDescription,
            };
            data.push(newTask);
            await new Promise(resolve => {
                rl.question('', () => {
                  resolve();
                });
            });

Block of Code (Search for a task):
      const searchKeyword = await getUserInput('Enter search keyword: ');
              const matchingTasks = data.filter(task =>
                  task.title.includes(searchKeyword) || task.description.includes(searchKeyword)
              );
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

Block of Code (Edit a task):
      console.log('\nEditing a Task');
              console.log('------------------');
              console.log('List of tasks:');
              if (data && data.length > 0) {
                  data.forEach((task, index) => {
                    console.log(`${index + 1}. ${task.title} - ${task.description}`);
                  });
                }
              const editIndex = parseInt(await getUserInput('\nEnter the tasks number you want to edit: '), 10);
              if (isNaN(editIndex - 1) || (editIndex - 1) < 0 || (editIndex - 1) >= data.length) {
                console.log('Error: Invalid index.');
                break;
              }
              console.log('Enter new title (leave blank to keep current):')
              const newTitle = await getUserInput('\nCurrent title: ');
              const newDescription = await getUserInput('Enter a new description (leave blank to keep current): '); 
              if (newTitle !== '') {
                data[editIndex - 1].title = newTitle;
              }
              if (newDescription !== '') {
                data[editIndex - 1].description = newDescription;
              }
              console.log('Task updated successfully!');
              await new Promise(resolve => {
                  rl.question('\nPress any key to return to the main menu...', () => {
                      resolve();
                  });
              });

Block of Code (Delete a task):
      console.log('Delting a Task');
              console.log('----------------');
              console.log('List of tasks:');
              console.log(' ');
              if (data && data.length > 0) {
                  data.forEach((task, index) => {
                    console.log(`${index + 1}. ${task.title} - ${task.description}`);
                  });
                }
              const deleteIndex = parseInt(await getUserInput('\nEnter the index of the task to delete: '), 10);
              const IndexNumber = deleteIndex - 1;
              if (isNaN(IndexNumber) || IndexNumber < 0 || IndexNumber >= data.length) {
                console.log('Error: Invalid index.');
                break;
              }
              console.log(`\nYou choosen to delete the task: "${data[IndexNumber].title}".`);
              const confirmDeletion = await getUserInput('Are you sure you want to delete this task? (yes/no): ');
              if (confirmDeletion.toLowerCase() === 'yes') {
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

Block of Code (Exit):
      console.log('Goodbye!');
              rl.close();
              process.exit(0);


#### Checklist
- [x] Task 1 Completed
- [x] Task 2 Completed
- [x] Task 3 Completed
- [x] Task 4 Completed
- [x] Task 5 Completed
- [x] Task 7 Completed
- [x] Task 8 Completed


