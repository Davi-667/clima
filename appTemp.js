/** 
 * @param {*} idCard nombre del id de cada tarjeta
 */

const mostrarCard = (idCard) => {
    try{
        const card = document.querySelector(`#${idCard}`);
        card.classList.remove('d-none');
    } catch (error) {
        console.error(error);
    }
}

/** 
 * @param {*} idCard nombre del id de cada tarjeta
 */

const ocultarCard = (idCard) => {
    try{
        const card = document.querySelector(`#${idCard}`);
        card.classList = 'card d-none';
    } catch (error) {
        console.error(error);
    }
}

/**
 * @returns la cantidad de dias a leer
 */
const leerCantidadN = () => {
    return new Promise( async (resolve, reaject) => {
        try {
            const formCantidadDias = document.querySelector('#formCantidadDias');
            formCantidadDias.addEventListener('submit', async (e) => {
                e.preventDefault();
                const cantidadDias = document.querySelector('#cantidadDias');
                !isNaN(cantidadDias.value)?resolve(parseInt(cantidadDias.value)):reaject(new Error ('Ingrese número de días hasta 31'));
            })
        } catch (error) {
            reaject(error);
        }
    })
}

/*
* @returns Confirmacion de la cantidad de dias a leer.
*
*/

const leerDias = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const formDias = document.querySelector('#formDias');
                formDias.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const diastotales =  document.querySelector('#diastotales');
                    const inputsTemperaturas = document.querySelector('#inputsTemperaturas');
                        console.log(diastotales.value);
                        if(parseInt(diastotales.value)<30){
                            for (let i = 0; i < parseInt(diastotales.value);i++) {
                                const inputTemp = document.createElement('input');
                                inputTemp.type = 'number';
                                inputTemp.classList = 'temp';
                                inputTemp.placeholder = 'Edad Integrante ' + (i + 1 );
                                inputsTemperaturas.appendChild(inputTemp);
                            }
                        }
                !isNaN(diastotales.value)?resolve(parseInt(diastotales.value)):reject(new Error('Ingrese Dato numérico'));
                })
        }catch (error) {
            reject(error);
        }
    })
};


const leerValores = () => {
    return new Promise ( async (resolve, reject) => {
    try {
        const formValores = document.querySelector('#formValores');
        const tempElements = document.querySelectorAll('.temp');
        formValores.addEventListener('submit', (e) => {
            e.preventDefault();
            const temperaturas = [];
            tempElements.forEach( temp => temperaturas.push(parseInt(temperaturas.value)?parseInt(temp.value):0));
            resolve(temperaturas);
            });
            } catch (error) {
                reject(error);
            }
    })
}


/**
 * @param  {*}idElement
 * @param  {*} data
 */

const insertarDatos = (idElement,data) => {
    try {
        const element = document.querySelector(`#${idElement}`);
        element.innerText = data;
    } catch (error) {
        console.error(error);
    }
};




const insertarTBody = (dias, temperaturas) => {
    try {
        const tdBody = document.querySelector('#tableBody');
        const tr = document.createElement('tr');
        const tdDias = document.createElement('td');
        const tdTemperaturas = [];
            temperaturas.forEach (temp => {
                const tdTemp = document.createElement('td');
                tdTemp.innerText = temp;
                tdTemperaturas.push(tdTemp);
            })
        tdDias.innerText = dias;
        tr.appendChild(tdDias);

        tdTemperaturas.forEach( td => tr.appendChild(td));
        tdBody.appendChild(tr);
    } catch (error) {
        console.error(error);
    }
}




const App = async () => {
    let N = 0;
    let dias = [];
    let temperaturas = [];
    const valores = [];
            ocultarCard('cardDias');
            ocultarCard('cardValores');
            ocultarCard('cardDatos');
            ocultarCard('cardTabla');
            try {
                N = await leerCantidadN();
            } catch (error) {
                console.error(error);
            }           
            ocultarCard('cardCantidadDias');
            mostrarCard('cardDias');
            for (let i = 0; i < N; i++) {
                try {
                    const dia = await leerDias();
                    console.log('dia -> '+dia);
                    dias.push(dia);
                    ocultarCard('cardDias');
                    mostrarCard('cardValores');
                } catch (error) {
                    console.error(error);
                }                 
                try {
                    const arrTemp = await leerValores();
                    const tempElements = document.querySelectorAll('.temp');
                        tempElements.forEach(tempElement => tempElement.remove());
                        temperaturas.push(arrTemp);
                } catch (error) {
                    console.error(error);
                }
                mostrarCard('cardDias');
                ocultarCard('cardValores'); // Ocultar tarjetas después de leer edades
            }  

        console.log(valores);
        console.log(dias);
        console.log(temperaturas);   
}
App();