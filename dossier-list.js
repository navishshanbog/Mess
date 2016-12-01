import React, {Component} from 'react';
import { connect } from 'react-redux';
//import DossierListItem from './dossier-listItem';

class DossierList extends Component {

         constructor(props) {
                super(props);
                this.state = {
                        dosText: '',
                        showWYSIWYG: false,
                        totalCargoSelected: 0,
                        userUpdatedDos: false
                };
              //  this.beginEdit = this.beginEdit.bind(this);
                this.initEditor = this.initEditor.bind(this);
        }



      initEditor() {
                var self = this;
                console.log("FILE NAME ", CKEDITOR.instances.editor);
                      //event.stopPropagation();
                      if (self.state.showWYSIWYG) {
                    //            let editorID = self.state.field_name;
                                CKEDITOR.replace('editor', { toolbar: "Basic", width: 870, height: 150});
                    //            var focusManager = new CKEDITOR.focusManager( CKEDITOR.instances.editor );
                    //            focusManager.focus();
                                CKEDITOR.instances.editor.on('blur', function() {
                                        console.log(" on blur function");
                                        let data = CKEDITOR.instances.editor.getData();
                                        CKEDITOR.instances.editor.destroy();
                                        self.setState({
                       //                 field_value:escape(data),
                                        showWYSIWYG:false,
                                        userUpdatedDos: true,
                                        totalCargoSelected: self.props.cargoSelected.length,
                       //                 field_name:'',
                                        dosText : data
                                        });
                                });
                      }
        }
    
        componentDidUpdate() {
                console.log("Componetn Did update and dostext", this.state.dosText);
             this.initEditor(this);    
         } 
         


        render() {
                console.log("Length of the total cargo selected", this.state.totalCargoSelected.length);
                console.log(this.props.cargoSelected.length);
                if (this.props.cargoSelected.length <= 0) {
                        return (<div> 
                                        <h3> in Dossier </h3>
                                        <hr />
                                        No cargo selected 
                                </div>)
                }
                console.log("he comparision ",this.state.dosText.indexOf(this.props.cargoSelected[0].HouseBill));
                if(this.props.cargoSelected.length == 1) {
                      console.log("Thi sis stasdfsdfte dos text ", this.state.dosText);
                      var  readOnlyText = this.state.dosText;
                      if(this.state.dosText == '') {
                              readOnlyText = `<p /> On ${this.props.cargoSelected[0].ArrivalDate} the POI imported as ${this.props.cargoSelected[0].Role} imported ${this.props.cargoSelected[0].GoodsDescription}.<br />
                                  Other details include: <br />
                                  --------------------------- <br />
                                  OMT: ${this.props.cargoSelected[0].OMT} <br />
                                  House Bill: ${this.props.cargoSelected[0].HouseBill}<br />`;
                      } else  if(this.state.dosText.indexOf(this.props.cargoSelected[0].HouseBill) == -1){ 
                              readOnlyText = `<p /> On ${this.props.cargoSelected[0].ArrivalDate} the POI imported as ${this.props.cargoSelected[0].Role} imported ${this.props.cargoSelected[0].GoodsDescription}.<br />
                                  Other details include: <br />
                                  --------------------------- <br />
                                  OMT: ${this.props.cargoSelected[0].OMT} <br />
                                  House Bill: ${this.props.cargoSelected[0].HouseBill}<br />`;
                      } 
                        
                        if ( this.state.showWYSIWYG  ) {
                                return (
                                        <div> 
                                                <h3> in Dossier </h3>
                                                <hr />
                                                <textarea key={this.props.cargoSelected[0].HouseBill} name='editor' cols="100" rows="6" defaultValue={readOnlyText} />
                                        </div>
                                )
                       } else {
                                return (
                                        <div> 
                                                <h3> in Dossier </h3>
                                                <hr />
                                                <div key={this.props.cargoSelected[0].HouseBill} className='description_field' onClick={() => {
                                                        this.setState ({showWYSIWYG: true, dosText: readOnlyText, userUpdatedDos: false, totalCargoSelected: this.props.cargoSelected.length})
                                                }} dangerouslySetInnerHTML={ {__html:readOnlyText } } ></div>
                                         </div>
                                )  
                        }    
                }
               if(this.props.cargoSelected.length > 1) {
                       console.log("Thi sis state dos text ", this.state.dosText);
                        var  readOnlyText = this.state.dosText;
                        console.log("read only text Before ", readOnlyText);
                        console.log("User updated dos ", this.state.userUpdatedDos);
                        console.log("Length of the cargoSelected", this.props.cargoSelected.length);
                        console.log("Length of the total cargo selected", this.state.totalCargoSelected);
                        console.log("the show editor flag", this.state.showWYSIWYG);

                        // check if the user ever edited the dossier
                        if(this.state.userUpdatedDos) {
                                // the user updated the dossier   
                                if(this.state.showWYSIWYG && this.props.cargoSelected.length == this.state.totalCargoSelected) {
                                 return (
                                        <div> 
                                                <h3> in Dossier </h3>
                                                <hr />
                                                <textarea key={this.props.cargoSelected[0].HouseBill} name='editor' cols="100" rows="6" defaultValue={readOnlyText} />
                                        </div>
                                )
                                } else {
                                        readOnlyText += `<p \> On ${this.props.cargoSelected[0].ArrivalDate} the POI imported as ${this.props.cargoSelected[0].Role} imported ${this.props.cargoSelected[0].GoodsDescription}.<br />
                                                Other details include: <br />
                                                --------------------------- <br />
                                                OMT: ${this.props.cargoSelected[0].OMT} <br />
                                                House Bill: ${this.props.cargoSelected[0].HouseBill}<br />`;
                                } 
                        } else if(this.state.showWYSIWYG) {
                                 return (
                                        <div> 
                                                <h3> in Dossier </h3>
                                                <hr />
                                                <textarea key={this.props.cargoSelected[0].HouseBill} name='editor' cols="100" rows="6" defaultValue={readOnlyText} />
                                        </div>
                                )
                        } else {
                                // the user never edited the dossier before
                                var toAdd = this.props.cargoSelected.length-1;
                                        while(toAdd>=0)  {
                                                readOnlyText += `<p \> On ${this.props.cargoSelected[toAdd].ArrivalDate} the POI imported as ${this.props.cargoSelected[toAdd].Role} imported ${this.props.cargoSelected[toAdd].GoodsDescription}.<br />
                                                Other details include: <br />
                                                --------------------------- <br />
                                                OMT: ${this.props.cargoSelected[toAdd].OMT} <br />
                                                House Bill: ${this.props.cargoSelected[toAdd].HouseBill}<br />`;
                                                toAdd --;
                                        } 
                               return (
                                      <div> 
                                                <h3> in Dossier </h3>
                                                <hr />
                                                <div key={this.props.cargoSelected[0].HouseBill} className='description_field' onClick={ () => {
                                                                this.setState ({showWYSIWYG: true, dosText: readOnlyText, totalCargoSelected: this.props.cargoSelected.length})
                                                        }} dangerouslySetInnerHTML={ {__html:readOnlyText } } ></div>
                                        </div>  
                               ) 
                        }

                  /*      if(!this.state.showWYSIWYG) {
                                if(this.props.cargoSelected.length <= this.state.totalCargoSelected && !this.state.userUpdatedDos) {
                                                console.log("user updated");
                                                console.log("inside user updated Before ", readOnlyText);
                                                readOnlyText += `<p \> On ${this.props.cargoSelected[0].ArrivalDate} the POI imported as ${this.props.cargoSelected[0].Role} imported ${this.props.cargoSelected[0].GoodsDescription}.<br />
                                                Other details include: <br />
                                                --------------------------- <br />
                                                OMT: ${this.props.cargoSelected[0].OMT} <br />
                                                House Bill: ${this.props.cargoSelected[0].HouseBill}<br />`;
                                                console.log("inside user updated after ", readOnlyText);
                                        } else {
                                                console.log("No user udpated");
                                                console.log("inside user updated Before 1111 ", readOnlyText);
                                                var toAdd = this.props.cargoSelected.length-1;
                                                while(toAdd>=0)  {
                                                readOnlyText += `<p \> On ${this.props.cargoSelected[toAdd].ArrivalDate} the POI imported as ${this.props.cargoSelected[toAdd].Role} imported ${this.props.cargoSelected[toAdd].GoodsDescription}.<br />
                                                Other details include: <br />
                                                --------------------------- <br />
                                                OMT: ${this.props.cargoSelected[toAdd].OMT} <br />
                                                House Bill: ${this.props.cargoSelected[toAdd].HouseBill}<br />`;
                                                toAdd --;
                                                }  
                                        console.log("inside user updated After 1111 ", readOnlyText);
                                        }
                        }
                       console.log("read only text AFter ", readOnlyText);
                        console.log("for Multiple ",readOnlyText, this.state.showWYSIWYG);          
                        if ( this.state.showWYSIWYG  ) {
                                return (
                                        <div> 
                                                <h3> in Dossier </h3>
                                                <hr />
                                                <textarea key={this.props.cargoSelected[0].HouseBill} name='editor' cols="100" rows="6" defaultValue={readOnlyText} />
                                        </div>
                                )
                       } else {
                                return (
                                        <div> 
                                                <h3> in Dossier </h3>
                                                <hr />
                                                <div key={this.props.cargoSelected[0].HouseBill} className='description_field' onClick={ () => {
                                                                this.setState ({showWYSIWYG: true, dosText: readOnlyText, userUpdatedDos: false, totalCargoSelected: this.props.cargoSelected.length})
                                                        }} dangerouslySetInnerHTML={ {__html:readOnlyText } } ></div>
                                        </div>
                                )
                       } */
               }
        }
}

function mapStateToProps(state) {
        return { cargoSelected: state.selectedCargo
        }
}

export default connect(mapStateToProps) (DossierList);


       /* renderCargoDetails(cargoItem) {
                 return (
                                <div key={cargoItem.HouseBill}>
                                        <DossierListItem  dosItem={cargoItem} />
                                        <hr />
                                       
                                </div>
                 ); */
               /*  return (
                         <div key={cargoItems.HouseBill}>
                                <span>
                                        <div id={cargoItems.HouseBill} >
                                                <textarea cols="100" defaultValue={dosText} wrap="hard" />
                                                <h1>Inline Editing in Action!</h1>
                                                <p>The "div" element that contains this text is now editable. </p>
                                                <hr />
                                        </div>
                                </span>
                        </div>
                 );*/
      /*  } */
      /*          var dosText = `On ${cargoItems.ArrivalDate} the POI imported as ${cargoItems.Role} imported ${cargoItems.GoodsDescription}.

Other details include:
---------------------------
OMT: ${cargoItems.OMT} 
House Bill: ${cargoItems.HouseBill}`;
               /* return ( <div key={cargoItems.HouseBill}>
                                <span>
                                        <div id={cargoItems.HouseBill} >
                                                <textarea cols="100" defaultValue={dosText} wrap="hard" />
                                                <h1>Inline Editing in Action!</h1>
                                                <p>The "div" element that contains this text is now editable. </p>
                                                <hr />
                                        </div>
                                        <div id="editor1" contentEditable="true" ref="test" onFocus={this.enableEditor}>
                                                <h1>Inline Editing in Action!</h1>
                                                <p>The "div" element that contains this text is now editable. </p>
                                        </div>
                                        <script>
                                        CKEDITOR.replace( 'editor1' );
                                        </script>
                                </span>
                        </div>
                ); */

     /*         if ( this.state.showWYSIWYG  ) {
                        var field = this.state.field_name;
                        this.initEditor(field);
                        return (
                                <DossierListItem dosItem = {dosText} key={cargoItems.HouseBill} />
                                <textarea key={cargoItems.HouseBill} name='editor' cols="100" rows="6" defaultValue={dosText}></textarea>
                        )
                } else {
                        return (
                                <p key={cargoItems.HouseBill} className='description_field' onClick={this.beginEdit}>{dosText}</p>
                        )
                }  


        } */