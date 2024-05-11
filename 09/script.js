    const library = [
        {
            ISBN: '123456789',
            TITLE: 'Harry Potter',
            AUTHOR: 'J. K. Rowling',
            YEAR: '1999'
        }
    ];
    let inputData = prompt("Enter data");
    let obj = {};
    while (inputData) {
    let split = inputData.split(";");
    if (split.length<4) {
        alert("Ошибка! Я ожидаю от вас уникальный код, название книги, автор и год выпуска");
    }
    obj.ISBN = split[0];
    obj.TITLE = split[1];
    obj.AUTHOR = split[2];
    obj.YEAR = split[3];
    library.push(obj);
    obj = {};
    alert("Книга успешно добавлена");
        inputData = prompt("Enter data");
    }
    alert("Список книг");
    for (let l of library) {
    alert(l.TITLE);    
    }