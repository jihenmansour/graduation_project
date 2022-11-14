import React from 'react';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { ChevronLeft, ChevronRight} from "react-bootstrap-icons";
import "./calendarToolbar.css";
import {Button}from "antd" ;



export  class CalendarToolbar extends Toolbar{


	componentDidMount() {
		const view = this.props.view;
		console.log(view)
	}
      

	render() {
		return (
			<div>
				<div className="rbc-btn-group" style={{
                    marginTop:"45px"
                }}> 
                    <Button type="primary" className="tag-primary" onClick={() => this.navigate('PREV')} >
                       
                        <ChevronLeft />
                    </Button>
					<Button type="primary" className="tag-primary" onClick={() => this.navigate('NEXT')}><ChevronRight/></Button>
                    <Button type="primary" className="tag-primary" onClick={() => this.navigate('TODAY')}>aujourd'hui</Button>
                    <div className="rbc-toolbar-label" style={{
                    fontSize:"1.75em"
                }}>{this.props.label}</div>
				</div>
				<ul class="circle" style={{
                    float:"right"
                }}>
                  <li className='item1'><h6>À Faire</h6></li>
                  <li className='item2'><h6>En Cours</h6></li>
                  <li className='item3'><h6>En Attente</h6></li>
                  <li className='item4'><h6>Terminé</h6></li>
                </ul>
		</div>	
		);
	}
}