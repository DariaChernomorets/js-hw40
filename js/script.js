'use strict';
(function () {
    const key = 'dataKey'
    const form = document.querySelector('#form');
    form.addEventListener('submit',event=>{
        event.preventDefault();
        event.stopPropagation();

        const {target} = event;

        const info = target.querySelectorAll('input,select,textarea');
        let terms = target.querySelector('.form-check-input')
        let data = null;

        if (terms.checked) {
            data = Array.from(info)
                .reduce((acc,item)=>{
                    acc[item.name] = item.value;
                    return acc

                },{})

            console.log(data)
        } else {
            alert('Please agree to terms')
        }

        const dataToSave = localStorage.getItem(key) ?
            JSON.parse(localStorage.getItem(key)) : [];

        dataToSave.push(data)

        localStorage.setItem(key, JSON.stringify(dataToSave));


        let id = 1;
        let doc = window.open().document;

        for (let key in dataToSave){
            doc.write(`<h1>User ${id++}</h1>`)

            for (let info in dataToSave[key]) {


                doc.write(`

                    
                    <p>

                        ${info} : ${dataToSave[key][info]}

                    </p>

                `)
            }
        }

   doc.close();

    })

})();

