import * as firebase from 'firebase';

class Helpers {

/*
@Jose Carvajal
*Realiza la conexion con la DB y realiza la inserción de los eventos.
*Implementa el push para la creación de un objeto en la DB con un UID
*Retorna --> Promise
*/
    static setEventEvent(title, coment, type, dateEvent) {
        return new Promise((resolve, reject) => {
            let eventsPath = '/events/'
            let event = {
                title: title,
                coment: coment,
                type: type,
                date: dateEvent
            }
            firebase.database().ref(eventsPath).push(event).then(() => {
                resolve()
            }, err => {
                reject(err)
            })
        })
    }
  
/*
@Jose Carvajal
*Realiza la conexion con la DB y realiza la petición de los eventos.
*Retorna --> Promise
* La data del resolve es un array de con los eventos y sus detalles
*/    

    static getEventsDb(){
        return new Promise((resolve,reject)=>{
            let eventsPath = '/events/'
            firebase.database().ref(eventsPath).once('value', snapshot=>{
                let arrayEvents=[];
                if(snapshot.val()){
                    snapshot.forEach((childSnapshot)=>{
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        item.daysRemaining = this.numberOfDayRemaining(new Date(),new Date(item.date))
                        item.imagePath = this.setImagePath(item.type)
                        arrayEvents.push(item);
                    })
                    resolve(arrayEvents)
                }
            },err=>{
                reject(err);
            })
        })
    }
/*
@Jose Carvajal
*Permite el calculo de los dias que quedan entre la fecha actual y la fecha del evento.
*@param todayDate --> fecha actual
*@param eventDate ---> fecha del evento
*Retorna --> los dias restantes
*/  
    static numberOfDayRemaining(todayDate, eventDate){
        let milliseconds_per_day = 1000 * 60 * 60 * 24;
        let utc1 = Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate())
        let utc2 = Date.UTC(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate())
        return Math.floor((utc2 - utc1) / milliseconds_per_day);
    }
/*
@Jose Carvajal
*Permite la asignación de direcciones de imagenes, dependiendo del tipo de evento
*@param type --> tipo del evento
*Retorna --> retorna el path de la imagen
*/ 
    static setImagePath(type){
        if(type == 'Viaje'){
            return 'https://img.culturacolectiva.com/content/2016/07/planear-tu-viaje-medium.jpg'
        }else if(type == 'Fiesta'){
            return 'https://static.vix.com/es/sites/default/files/styles/large/public/btg/fiesta.jpg?itok=NdlpJM6S'
        }else if(type == 'Reunion'){
            return 'http://www.pqs.pe/sites/default/files/styles/852x479/public/archivos/2015/actualidad/02/dcruzado/mp900442889.jpg?itok=4JRx_rUN'
        }else {
            return 'http://noticias.universia.net.mx/mx/images/seminario_cetys.jpg'
        }
    }

}

module.exports = Helpers 