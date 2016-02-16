function appendPictures() {
    var picNumber = 9,
        pictures = document.querySelector('.pictures > .block-variants');
    for (var i = 1; i <= picNumber; i++) {
        var inp = document.createElement('input');
        var label = document.createElement('label');
        pictures.appendChild(inp);
        pictures.appendChild(label);
        inp.type = 'radio';
        inp.name = 'picture';
        inp.id = i;
        inp.setAttribute('onclick', "data.setData(this.name, this.id)");
        label.setAttribute('for', i.toString());
        label.innerHTML = "\<img src='" + i.toString() + ".png'\>";
        pictures.innerHTML += '\<\/br\>';
    }
}

function appendNames() {
    var namesList = [
        "дни открытых дверей",
        "ФМШ",
        "олимпиады для абитуриентов",
        "случайная кафедра ХАИ",
        "тест по выбору направления обучения ХАИ",
        "ближайшие конференции в ХАИ",
        "ближайшие конференции Scopus в Украине",
        "ближайшие семинары и встречи с интересными людьми в ХАИ",
        "интересные направления обучения в ХАИ",
        "последние научные публикации ХАИ",
        "издан новый учебник в ХАИ",
        "научная работа в ХАИ в рамках МАН",
        "новости профкома студентов",
        "уровень сертификации сайта"
    ];
    var names = document.querySelector('.names > .block-variants');
    for (var i = 0; i < namesList.length; i++) {
        var option = document.createElement('p');
        option.className = 'option';
        option.id = i + 'name';
        option.addEventListener('click', function () {
                document.getElementById(data.type).style.backgroundColor = "white";
                document.getElementById(this.id).style.backgroundColor = "#cccccc";
                data.setData('type', this.id);
            }
        );
        option.innerHTML = namesList[i];
        names.appendChild(option);
    }
}

window.onload = function () {
    appendPictures();
    appendNames();
};

var data = {
    lang: 'rus',
    width: 300,
    height: 100,
    opacity: false,
    backgroundColor: '#ffffff',
    picture: '1',
    withPicture: true,
    type: '0name',

    setData: function (param, value) {
        this[param] = value;
        if (param == 'opacity') {
            var color = document.querySelectorAll('.block-variants > .color');
            color[0].style.display = value ? 'none' : 'inline-block';
            color[1].style.display = value ? 'none' : 'inline-block';
        }
        if (param == 'withPicture') {
            document.querySelector('.pictures').style.display = value ? 'block' : 'none';
        }
        document.getElementById('preview').src = 'test5.php?w=' + data.width + '\&h='
            + data.height + '\&lang=' + data.lang + '\&opacity=' + data.opacity + '\&type=' + data.type +
            '\&withPicture=' + data.withPicture;
        if (data.withPicture) {
            document.getElementById('preview').src += '\&pic=' + data.picture;
        }
        if (!data.opacity) {
            document.getElementById('preview').src += '\&bgColor=' + data.backgroundColor.slice(1, 8);
        }
    },
    getLink: function () {
        var link = document.getElementById("link");
        link.value = '\<a href="#"\>\<img src="http://justformyapp.esy.es/test5.php?w=' + data.width + '\&h=' + data.height + '\&lang=' +
            data.lang + '\&opacity=' + data.opacity + '\&type=' + data.type + '\&withPicture=' + data.withPicture;
        if (data.withPicture) {
            link.value += '\&pic=' + data.picture;
        }
        if (!data.opacity) {
            link.value += '\&bgColor=' + data.backgroundColor.slice(1, 8);
        }
        link.value += '"\></a>';
    }
};