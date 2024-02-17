const saveBtn = document.getElementById('save');

saveBtn.addEventListener('click', function () {
    // Array to store form data to show in Devtools console.
    const formData = [];

   
    const inputs = document.querySelectorAll('.formInput');

    // Looping each form input in List.
    inputs.forEach(input => {
        // Getting label text from html
        const labelElement = input.querySelector('label');
        const label = labelElement ? labelElement.innerText : '';

        // Check if label is present
        if (label) {
            // Get input type
            const inputElement = input.querySelector('input, select, textarea');
            const type = inputElement ? (inputElement.type || inputElement.tagName.toLowerCase()) : '';

            // Get input value
            const value = inputElement ? inputElement.value : '';

            // Store select options
            let options = [];
            if (type === 'select') {
                const selectOptions = input.querySelectorAll('select option');
                selectOptions.forEach(option => {
                    options.push(option.value);
                });
            }

            // Placeholder text
            const placeholder = inputElement ? (type === 'textarea' ? 'Enter your text here' : inputElement.placeholder) : '';

            // Push form data object into formData array
            formData.push({
                id: uuidv4(),
                type: type,
                label: label,
                placeholder: placeholder,
                options: options.length > 0 ? options : undefined,
                value: value
            });
        }
    });

    // Log formData as JSON string in Devtools console
    console.log(JSON.stringify(formData,null,13));
});  





// Function to generate a unique UUIDv4 
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


// Delete functionality
const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('are sure ?')
        button.parentElement.parentElement.parentElement.remove();
    });
});

// Adding input Function onClick of add.
const formInput = document.getElementById('form-input');
formInput.addEventListener('click', function () {
    const newDiv = document.createElement('div');
    newDiv.classList.add('formInput', 'child');
    newDiv.setAttribute('draggable', true);
    newDiv.innerHTML = `
      <div class="inputInfo">
        <label for="">Sample input</label>
        <div>
          <button class="delete"><i class="fa-solid fa-trash"></i></button>
         
        </div>
      </div>
      <input type="text" class="formInput formCommon select-info">
    `;
    document.getElementById('form').appendChild(newDiv);
   
});

// Adding select inputs Function onClick of add.
const select = document.getElementById('select');
select.addEventListener('click', function () {
    const newDiv = document.createElement('div');
    newDiv.classList.add('formInput', 'child');
    newDiv.setAttribute('draggable', true);
    newDiv.innerHTML = `
    <div class="inputInfo ">
        <label for="">Sample Select</label>
        <div>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    <select type="text" class="formInput formCommon select-info">
        <option value="name1">Sample Option 1</option>
        <option value="name2">Sample Option 2</option>
        <option value="name3">Sample Option 3</option>
    </select>
    `;
    document.getElementById('form').appendChild(newDiv);
  
});

//Adding text area inputs Function onClick of add.
const textArea = document.getElementById('textArea');
textArea.addEventListener('click', function () {
    const newDiv = document.createElement('div');
    newDiv.classList.add('formInput', 'child');
    newDiv.setAttribute('draggable', true);
    newDiv.innerHTML = `
    <div class="inputInfo">
        <label for="">Sample TextArea</label>
        <div>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
    <textarea class="formInput formCommon" style="height: 100px;"></textarea>
    `;
    document.getElementById('form').appendChild(newDiv);
  
});


// Drag and drop functionality in UI.
const parent = document.querySelector('.parent');

parent.addEventListener('dragstart', function (e) {
    dragged = e.target;
    e.target.classList.add('dragging');
});

parent.addEventListener('dragover', function (e) {
    e.preventDefault(); 
});

parent.addEventListener('dragenter', function (e) {
    if (e.target.classList.contains('child')) {
        e.target.style.backgroundColor = "#ccc";
    }
});

parent.addEventListener('dragleave', function (e) {
    if (e.target.classList.contains('child')) {
        e.target.style.backgroundColor = "";
    }
});

parent.addEventListener('drop', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('child')) {
        e.target.style.backgroundColor = "";
        if (e.target.nextSibling === dragged) {
            parent.insertBefore(dragged, e.target.nextSibling.nextSibling);
        } else {
            parent.insertBefore(dragged, e.target.nextSibling);
        }
    }
});

parent.addEventListener('dragend', function (e) {
    dragged.classList.remove('dragging');
});
