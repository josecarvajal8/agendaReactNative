import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import ModalSelector from 'react-native-modal-selector'
import DatePicker from 'react-native-datepicker';
import Helpers from '../lib/helpers';


export default class NavBarView extends Component {

    constructor(props) {
        super(props)
        this.key = 0;
        this.state = {
            showMe: false,
            date: new Date(),
            title: '',
            coment: '',
            typeEvent: '',
            dateEvent: '',
            spinnerVisible: false
        }

    }
    /*
    *@Jose Carvajal
    *Metodo que permite cambiar el estado, de la variable showMe
    *Dicha variable permite monstra y cerrar la ventana Modal
    */
    _closeModal = () => {
        this.setState(
            { showMe: false }
        )
    }

    /*
    *@Jose Carvajal
    *Metodo que permite insertar datos en la base de datos
    *La inserción de datos, se realiza a través del metodo setEventEvent de los Helpers
    */
    _saveEventData() {
        this.setState({ spinnerVisible: true });
        if (this.state.title != '' && this.state.typeEvent != '') {
            Helpers.setEventEvent(this.state.title,
                this.state.coment,
                this.state.typeEvent,
                this.state.dateEvent).then(() => {
                    this._closeModal()
                    alert('se ha creado de forma exitosa');
                    this.setState({ spinnerVisible: false });
                }).catch(err => {
                    this.setState({ spinnerVisible: false });
                    alert('error creando el evento');
                });
        } else {
            this.setState({ spinnerVisible: false });
            alert('Debes completar los datos');
        }
    }

    render() {
        return (
            <View>
                <NavBar
                >
                    <NavTitle>
                        {"AGENDA"}
                    </NavTitle>
                    <NavButton onPress={() => this.setState({ showMe: true })}>
                        <NavButtonText>
                            <Text style={styles.bottonTextNavBar}>+</Text>
                        </NavButtonText>
                    </NavButton>
                </NavBar>
                <Modal isVisible={this.state.showMe}>
                    <View style={styles.container}>

                        <Text style={styles.title}>Complete los siguientes datos</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Titulo del evento"
                            onChangeText={(text) => this.setState({ title: text })}
                            underlineColorAndroid="transparent"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Comentario"
                            onChangeText={(text) => this.setState({ coment: text })}
                            underlineColorAndroid="transparent"
                        />
                        <ModalSelector
                            data={data}
                            style={styles.picker}
                            initValue="Seleccione tipo de evento"
                            onChange={(option) => { this.setState({ typeEvent: option.label }) }} />

                        <DatePicker
                            style={styles.datePicker}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate={this.state.date}
                            maxDate="2019-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    backgroundColor: '#f4f6f5'
                                }
                            }}
                            onDateChange={(date) => { this.setState({ dateEvent: date, date: date }) }}
                        />

                        <TouchableOpacity style={styles.buttonModal}
                            onPress={this._saveEventData.bind(this)} >
                            <Text style={styles.buttonText}>CREAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonModal}
                            onPress={this._closeModal} >
                            <Text style={styles.buttonText}>CERRAR</Text>
                        </TouchableOpacity>
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.spinnerVisible} />
                    </View>
                </Modal>

            </View>

        )
    }
}

const data = [
    { section: true, key: 1, label: 'Tipos' },
    { key: 2, label: 'Reunion' },
    { key: 3, label: 'Viaje' },
    { key: 4, label: 'Fiesta' },
    { key: 5, label: 'Seminario' }
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255, 0.8)',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30
    },
    bottonTextNavBar: {
        fontSize: 40,
        fontWeight: 'bold',

    },
    input: {
        height: 40,
        width: 300,
        marginTop: 20,
        backgroundColor: 'rgba(2,50,95,0.1)',
        borderRadius: 20
    },
    datePicker: {
        height: 40,
        width: 300,
        marginTop: 20,
        paddingHorizontal: 10,


    },
    picker: {
        width: 300,
        marginTop: 20,
    },
    buttonModal: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        paddingVertical: 10,
        marginTop: 20,
        width: 150,
        borderRadius: 50
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
});