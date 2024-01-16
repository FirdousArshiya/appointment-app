// Write your code here

import {Component} from 'react'
import {v4} from 'uuid'

import {format} from 'date-fns'
import AppointmentItem  from '../AppointmentItem'

class Appointments extends Component {
    state = {
        appointmentsList: [],
        titleInput: '',
        dateInput: '',
        isFilterActive: false //starredItems
    }

    toggleIsStarred = id => {
        this.setState(prevState=>({
            appointmentsList: prevState.appointmentsList.map(eachAppointment=>{
                if(eachAppointment.id === id){
                    return {...eachAppointment, isStarred: !eachAppointment.isStarred}
                }
                return eachAppointment
            })
        }))
    }

    onClickStarred = () => {
        const {isFilterActive} = this.state

        this.setState({isFilterActive: !isFilterActive})
    }

    onChangeTitle = event => {
        this.setState({titleInput: event.target.value})
    }

    onChangeDate = event => {
        this.setState({dateInput: event.target.value})
    }

    onAddAppointment = event => {

        event.preventDefault()
        const {titleInput, dateInput } = this.state

        const formattedDate = dateInput ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE') : ''
        
        const newAppointment = {
            id: v4(),
            title: titleInput,
            date: formattedDate,
            isStarred: false
        }

        this.setState(prevState => ({
            appointmentsList: [...prevState.appointmentsList, newAppointment],
            titleInput: '',
            dateInput: ''
        }))
    } 
    
    getStarredFilteredAppointments = () => {
        const {appointmentsList, isFilterActive} = this.state

        if(isFilterActive){
            return appointmentsList.filter(eachAppointment => eachAppointment.isStarred === true)
        }
        return appointmentsList
    } 

    render(){

        const {titleInput, dateInput, isFilterActive} = this.state
        const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
        const filteredAppointmentsList = this.getStarredFilteredAppointments()

        return(
            <div className="app-contaianer">
                <div className="responsive-container">
                    <div className="appointments-container">
                        <div className="add-appointment-container">
                            <form onSubmit = {this.onAddAppointment} className="form">
                                <h1 className="appointment-heading">Add Appointment</h1>
                                <label htmlFor="title" className="label">
                                    Title
                                </label>
                                <input id="title" value = {titleInput} placeholder="Title" 
                                onChange = {this.onChangeTitle} className="input" />
                                <label htmlFor="date" className="label">
                                    DATE
                                </label>
                                <input type="date" id="date" value = {dateInput} 
                                onChange = {this.onChangeDate} className="input" />
                                <button type="submit" className="add-button">Add</button>     
                            </form>
                            <img src = "https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                            alt="appointments" className="appointments-img" />
                        </div>
                        <hr className="hr" />
                        <div className="header-with-star-filter-container">
                            <h1 className="appointments-heading">Appointments</h1>
                            <button type="button" className={`filter-style ${filterClassName}`}
                            onClick={this.onClickStarred}>Starred</button>
                        </div>
                        <ul className="appointments-list">
                            {filteredAppointmentsList.map(eachAppointment => (
                                <AppointmentItem
                                key ={eachAppointment.id}
                                appointmentDetails = {eachAppointment}
                                toggleIsStarred= {this.toggleIsStarred} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Appointments