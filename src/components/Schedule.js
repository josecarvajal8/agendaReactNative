import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions,ImageBackground, TextInput, ScrollView, RefreshControl } from 'react-native';
import Helpers from '../lib/helpers';
import EventsView from './EventsView';

export default class Schedule extends Component {
    state = {
        eventsSource: [],
        refreshing: false,
    }
    /*
    @ Jose Carvajal
    *Permite al usuario mediante pull down
    *refrescar la pagina
    *Implementa el metodo getEventsDb, 
    *para obtener la data de la DB
    */
    _onRefresh() {
        this.setState({ refreshing: true });
        Helpers.getEventsDb().then(eventData => {
            this.setState({ eventsSource: eventData });
            this.setState({ refreshing: false });
        }).catch(err => {
            alert('Problemas con la conexion al servidor');
            this.setState({ refreshing: false });
        });
    }
    /*
    @ Jose Carvajal
    *Permite la obtención de los eventos
    *almacenados en la DB
    * Implementa el metodo de getEventsDb de la clase Helpers
    *Realiza el set del array eventsSource
    */

    componentWillMount() {
        Helpers.getEventsDb().then(eventData => {
            this.setState({ eventsSource: eventData })
        }).catch(err => {
            alert('Problemas con la conexion al servidor');
        });
    }


    /*
    @ Jose Carvajal
    *Permite la iteración del eventSource, 
    *que es la variable que contiene todos
    *los eventos creados en DB
    */
    eventsList() {
        return this.state.eventsSource.map(eventsData => {
            return (
                <EventsView key={eventsData.key} eventData={eventsData}></EventsView>
            )
        });
    }

    render() {
       
        return (
            
                <View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >
                        {this.eventsList()}
                    </ScrollView>
                </View>
          


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null
    },
    button: {
        backgroundColor: 'rgba(2,50,95,0.5)',
        paddingVertical: 10,
        marginTop: 20,
        width: 300,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
});

