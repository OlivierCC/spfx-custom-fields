import * as React from 'react';

import styles from '../CustomFieldsWebPart.module.scss';
import { ICustomFieldsWebPartWebPartProps } from '../ICustomFieldsWebPartWebPartProps';
import { IPropertyFieldPeople } from '../controls/PropertyFieldPeoplePicker';

export interface ICustomFieldsWebPartProps extends ICustomFieldsWebPartWebPartProps {
}

export default class CustomFieldsWebPart extends React.Component<ICustomFieldsWebPartProps, {}> {
  public render(): JSX.Element {

    var peopleList: IPropertyFieldPeople[] = [];
    if (this.props && this.props.people)
      peopleList = this.props.people;
    var lists: string[] = [];
    if (this.props && this.props.listsCollection)
      lists = this.props.listsCollection;

    return (
      <div className={styles.customFieldsWebPart}>
        <div className={styles.container}>
          <div>
            <div style={{ backgroundColor: this.props.color, fontFamily: this.props.font, fontSize: this.props.fontSize ? this.props.fontSize : '12px', padding: '20px' }}>

              <div className="ms-MessageBar">
                <div className="ms-MessageBar-content">
                  <div className="ms-MessageBar-icon">
                    <i className="ms-Icon ms-Icon--infoCircle"></i>
                  </div>
                  <div className="ms-MessageBar-text">
                    Edit this WebPart to test the custom fields.
                  </div>
                </div>
              </div>

              <p className="ms-fontSize-xxl">
                <i className="ms-Icon ms-Icon--paint" aria-hidden="true"></i>
                    &nbsp; Layout Fields
              </p>

              <p>
                <i className="ms-Icon ms-Icon--text" aria-hidden="true"></i>&nbsp;
                <b>Font</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldFontPicker" target="_doc">(Doc)</a> : &nbsp;
                {this.props.font}

              </p>
              <p>
                <i className="ms-Icon ms-Icon--text" aria-hidden="true"></i>&nbsp;
                <b>Font Size</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldFontSizePicker" target="_doc">(Doc)</a> : &nbsp;
                {this.props.fontSize}

              </p>
              <p >
                <i className="ms-Icon ms-Icon--settings" aria-hidden="true"></i>&nbsp;
                <b>Color</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldColorPicker" target="_doc">(Doc)</a> : &nbsp;
                {this.props.color}
              </p>
              <p >
                <i className="ms-Icon ms-Icon--waffle" aria-hidden="true"></i>&nbsp;
                <b>Icon</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldIconPicker" target="_doc">(Doc)</a> : &nbsp;
                <i className={'ms-Icon ' + this.props.icon} aria-hidden="true" style={{fontSize:'large'}}></i>
                &nbsp;{this.props.icon}
              </p>
              <p >
                <i className="ms-Icon ms-Icon--listBullets" aria-hidden="true"></i>&nbsp;
                <b>Display Mode</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldDisplayMode" target="_doc">(Doc)</a> : &nbsp;
                {this.props.displayMode}
              </p>

              <p className="ms-fontSize-xxl">
               <i className="ms-Icon ms-Icon--fieldText" aria-hidden="true"></i>
                &nbsp; Text Input Fields
              </p>
              <p >
                <i className="ms-Icon ms-Icon--listBullets" aria-hidden="true"></i>&nbsp;
                <b>Custom List</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldCustomList" target="_doc">(Doc)</a> : &nbsp;
                {JSON.stringify(this.props.customList)}
              </p>
              <p >
                <i className="ms-Icon ms-Icon--key" aria-hidden="true"></i>&nbsp;
                <b>Password</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldPassword" target="_doc">(Doc)</a> : &nbsp;
                {this.props.password}
              </p>
              <p>
                <i className="ms-Icon ms-Icon--calendarWorkWeek" aria-hidden="true"></i>&nbsp;
                <b>Date</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldDatePicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.date}
              </p>
              <p >
                <i className="ms-Icon ms-Icon--calendarWorkWeek" aria-hidden="true"></i>&nbsp;
                <b>Date ISO</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldDatePicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.date2}
              </p>
              <p >
                <i className="ms-Icon ms-Icon--calendarWorkWeek" aria-hidden="true"></i>&nbsp;
                <b>Date Time</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldDateTimePicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.datetime}
              </p>

              <p>
                <i className="ms-Icon ms-Icon--phone" aria-hidden="true"></i>&nbsp;
                <b>Phone Number</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldPhoneNumber" target="_doc">(Doc)</a> :&nbsp;
                {this.props.phone}
              </p>
              <p>
                <i className="ms-Icon ms-Icon--creditCard" aria-hidden="true"></i>&nbsp;
                <b>Credit Card</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldMaskedInput" target="_doc">(Doc)</a> :&nbsp;
                {this.props.maskedInput}
              </p>
              <p>
                <i className="ms-Icon ms-Icon--globe" aria-hidden="true"></i>&nbsp;
                <b>Geolocation</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldMapPicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.geolocation}
              </p>

              <p className="ms-fontSize-xxl">
               <i className="ms-Icon ms-Icon--gear" aria-hidden="true"></i>
                 &nbsp; SharePoint Fields
              </p>
              <div>
                <i className="ms-Icon ms-Icon--peopleAdd" aria-hidden="true"></i>&nbsp;
                <b>Users</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldPeoplePicker" target="_doc">(Doc)</a> :&nbsp;

                <ul>
                {
                  peopleList.map((element: IPropertyFieldPeople, i:number) => {
                    return (
                      <li>
                        Username : {element.fullName}<br/>
                        Login: {element.login}<br/>
                        Email: {element.email}<br/>
                        JobTitle: {element.jobTitle}<br/>
                      </li>
                    );
                })}
                </ul>
              </div>

              <p>
                <i className="ms-Icon ms-Icon--pictureAdd" aria-hidden="true"></i>&nbsp;
                <b>Picture</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldPicturePicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.picture}
              </p>
              <p>
                <i className="ms-Icon ms-Icon--documentAdd" aria-hidden="true"></i>&nbsp;
                <b>Document</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldPicturePicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.document}
              </p>
              <p>
                <i className="ms-Icon ms-Icon--listBullets" aria-hidden="true"></i>&nbsp;
                <b>List</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldSPListPicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.list}
              </p>
              <p >
                <i className="ms-Icon ms-Icon--folderSearch" aria-hidden="true"></i>&nbsp;
                <b>Folder</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldSPFolderPicker" target="_doc">(Doc)</a> :&nbsp;
                {this.props.folder}
              </p>
              <div >
                <i className="ms-Icon ms-Icon--listBullets" aria-hidden="true"></i>&nbsp;
                <b>Lists</b>
                &nbsp;<a className="ms-fontSize-sPlus" href="https://github.com/OlivierCC/spfx-custom-fields/wiki/PropertyFieldSPListMultiplePicker" target="_doc">(Doc)</a> :&nbsp;
                <ul>
                {
                  lists.map((element: string, i:number) => {
                    return (
                      <li>{element}</li>
                    );
                })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
