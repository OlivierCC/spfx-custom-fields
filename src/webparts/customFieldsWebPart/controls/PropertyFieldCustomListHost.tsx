/**
 * @file PropertyFieldCustomListHost.tsx
 * Renders the controls for PropertyFieldCustomList component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-client-preview';
import { IPropertyFieldCustomListPropsInternal, ICustomListField, CustomListFieldType } from './PropertyFieldCustomList';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Button, ButtonType } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import PropertyFieldDatePickerHost from './PropertyFieldDatePickerHost';
import PropertyFieldDateTimePickerHost from './PropertyFieldDateTimePickerHost';
import PropertyFieldFontPickerHost from './PropertyFieldFontPickerHost';
import PropertyFieldFontSizePickerHost from './PropertyFieldFontSizePickerHost';
import PropertyFieldIconPickerHost from './PropertyFieldIconPickerHost';
import PropertyFieldColorPickerHost from './PropertyFieldColorPickerHost';
import PropertyFieldPasswordHost from './PropertyFieldPasswordHost';
import PropertyFieldPicturePickerHost from './PropertyFieldPicturePickerHost';
import PropertyFieldDocumentPickerHost from './PropertyFieldDocumentPickerHost';
import PropertyFieldSPListPickerHost from './PropertyFieldSPListPickerHost';
import PropertyFieldPeoplePickerHost from './PropertyFieldPeoplePickerHost';

/**
 * @interface
 * PropertyFieldCustomListHost properties interface
 *
 */
export interface IPropertyFieldCustomListHostProps extends IPropertyFieldCustomListPropsInternal {
}

export interface IPropertyFieldCustomListHostState {
  data?: any[];
  openPanel?: boolean;
  openListView?: boolean;
  openListAdd?: boolean;
  openListEdit?: boolean;
  selectedIndex?: number;
  hoverColor?: string;
  deleteOpen?: boolean;
  editOpen?: boolean;
}

/**
 * @class
 * Renders the controls for PropertyFieldCustomList component
 */
export default class PropertyFieldCustomListHost extends React.Component<IPropertyFieldCustomListHostProps, IPropertyFieldCustomListHostState> {

  /**
   * @function
   * Contructor
   */
  constructor(props: IPropertyFieldCustomListHostProps) {
    super(props);
    //Bind the current object to the external called onSelectDate method
    this.saveWebPart = this.saveWebPart.bind(this);
    this.onOpenPanel = this.onOpenPanel.bind(this);
    this.onClickAddItem = this.onClickAddItem.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onEnterHoverItem = this.onEnterHoverItem.bind(this);
    this.onLeaveHoverItem = this.onLeaveHoverItem.bind(this);
    this.onChangeSelectedItem = this.onChangeSelectedItem.bind(this);
    this.onClickDeleteItem = this.onClickDeleteItem.bind(this);
    this.onDismissDelete = this.onDismissDelete.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickUpdate = this.onClickUpdate.bind(this);
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onPropertyChangeJson = this.onPropertyChangeJson.bind(this);

    this.state = {
      data: this.props.value != null ? this.props.value : [],
      openPanel: false,
      openListView: true,
      openListAdd: false,
      openListEdit: false,
      deleteOpen: false,
      editOpen: false
    };
  }

  /**
   * @function
   * Function called when the ColorPicker Office UI Fabric component selected color changed
   */
  private saveWebPart(value: any[]): void {
    //Checks if there is a method to called
    if (this.props.onPropertyChange && value != null) {
      this.props.onPropertyChange(this.props.targetProperty, value);
    }
  }

  private onOpenPanel(element?: any): void {
    this.state.openPanel = true;
    this.state.openListView = true;
    this.state.openListAdd = false;
    this.state.editOpen = false;
    this.setState(this.state);
  }

  private onClickAddItem(element?: any): void {
    this.state.openListView = false;
    this.state.openListAdd = true;
    this.state.openListEdit = false;
    this.state.editOpen = false;
    this.setState(this.state);
  }

  private onClickDeleteItem(element?: any): void {
    this.state.deleteOpen = true;
    this.setState(this.state);
  }

  private onClickCancel(): void {
    this.state.openListView = true;
    this.state.openListAdd = false;
    this.state.openListEdit = false;
    this.state.editOpen = false;
    this.setState(this.state);
  }

  private onClickAdd(): void {
    var result = new Object();
    for (var i = 0; i < this.props.fields.length; i++) {
      if (this.props.fields[i] == null)
        continue;
      var ctrl = document.getElementById('input-' + this.props.fields[i].title);
      if (ctrl == null)
        continue;
      var str = ctrl['value'];
      if (str.length > 0 && (str[0] == '[' || str[0] == '{'))
        str = JSON.parse(str);
      result[this.props.fields[i].title] = str;
    }
    this.state.data.push(result);
    this.setState(this.state);

    this.saveWebPart(this.state.data);

    this.onClickCancel();
  }

  private onChangeSelectedItem(element?: any): void {
    var index = element.currentTarget.value;
    this.state.selectedIndex = index;
    this.setState(this.state);
  }

  private onEnterHoverItem(element?: any): void {
    this.state.hoverColor = 'white';
    element.currentTarget.style.backgroundColor = '#F8F8F8';
  }
  private onLeaveHoverItem(element?: any): void {
    element.currentTarget.style.backgroundColor = this.state.hoverColor;
  }

  private onDismissDelete(element?: any): void {
    this.state.deleteOpen = false;
    this.setState(this.state);
  }

  private clickDelete(element?: any): void {
    var indexToDelete = this.state.selectedIndex;
    var newData: any[] = [];
    for (var i = 0; i < this.state.data.length; i++) {
      if (i != indexToDelete)
        newData.push(this.state.data[i]);
    }
    this.state.data = newData;
    this.state.selectedIndex = -1;
    this.setState(this.state);
    this.onDismissDelete();
    this.saveWebPart(this.state.data);
  }

  private onClickEdit(element?: any): void {
    this.state.editOpen = true;
    this.state.openListView = false;
    this.setState(this.state);
  }

  private onClickUpdate(element?: any): void {

    var result = this.state.data[this.state.selectedIndex];
    for (var i = 0; i < this.props.fields.length; i++) {
      if (this.props.fields[i] == null)
        continue;
      var ctrl = document.getElementById('input-' + this.props.fields[i].title);
      if (ctrl == null)
        continue;
      var str = ctrl['value'];
      if (str.length > 0 && (str[0] == '[' || str[0] == '{'))
        str = JSON.parse(str);
      result[this.props.fields[i].title] = str;
    }
    this.setState(this.state);
    this.saveWebPart(this.state.data);
    this.onClickCancel();
  }

  private onPropertyChange(targetProperty: string, value?: any): void {
    var input = document.getElementById(targetProperty);
    input['value'] = value;
  }

  private onPropertyChangeJson(targetProperty: string, value?: any): void {
    var input = document.getElementById(targetProperty);
    input['value'] = JSON.stringify(value);
  }

  /**
   * @function
   * Renders the datepicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    //Renders content
    return (
      <div style={{ marginBottom: '8px'}}>
        <Label>{this.props.label}</Label>

        <Button onClick={this.onOpenPanel}>Select</Button>

        <Panel
          isOpen={this.state.openPanel} hasCloseButton={true}
          isLightDismiss={true} type={PanelType.medium}
          headerText={this.props.headerText}>

          { this.state.openListAdd === true ?
          <div>
               {this.props.fields != null ?
              <div>
              <div style={{marginBottom: '20px', backgroundColor: '#F4F4F4', width: '100%', padding: '5px'}}>
                <Button buttonType={ButtonType.hero} disabled={true} icon='plus'> &nbsp;Add item</Button>
                <Button buttonType={ButtonType.hero} onClick={this.onClickCancel} icon='arrowLeft'> &nbsp;Back</Button>
              </div>
              <table className="ms-Table" cellSpacing="0" style={{marginTop: '30px'}}>
                  <tbody>
                      {
                        this.props.fields.map((value: ICustomListField) => {
                          return (
                            <tr>
                              <td><Label>{value.title}
                              {value.required === true ? ' (*)': ''}
                              </Label></td>
                              <td>
                                { value.type == CustomListFieldType.string ?
                                  <input id={'input-' + value.title} className='ms-TextField-field' style={{marginBottom: '8px'}}/>
                                : ''
                                }
                                { value.type == CustomListFieldType.number ?
                                  <input id={'input-' + value.title} className='ms-TextField-field' style={{width: '100px', marginBottom: '8px'}} />
                                : ''
                                }
                                { value.type == CustomListFieldType.boolean ?
                                  <div  style={{marginBottom: '8px'}}>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <Checkbox/>
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.date ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldDatePickerHost label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.dateTime ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldDateTimePickerHost label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.font ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldFontPickerHost label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.fontSize ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldFontSizePickerHost label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.color ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldColorPickerHost label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.icon ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldIconPickerHost label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.password ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldPasswordHost label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.users ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldPeoplePickerHost label=""  context={this.props.context} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChangeJson} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }

                                { value.type == CustomListFieldType.list ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldSPListPickerHost label=""  context={this.props.context} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                              </td>
                            </tr>
                          );
                        })
                      }
                  </tbody>
                  </table>
                  </div>
                : ''
               }
               <div style={{marginTop: '30px'}}>
                <Button buttonType={ButtonType.primary} onClick={this.onClickAdd}>OK</Button>
                <Button buttonType={ButtonType.normal} onClick={this.onClickCancel}>Cancel</Button>
              </div>
          </div>
          : ''}

          { this.state.editOpen === true ?
          <div>
               {this.props.fields != null ?
                  <div>
                  <div style={{marginBottom: '20px', backgroundColor: '#F4F4F4', width: '100%', padding: '5px'}}>
                    <Button buttonType={ButtonType.hero} disabled={true} icon='editBox'> &nbsp;Edit</Button>
                    <Button buttonType={ButtonType.hero} onClick={this.onClickCancel} icon='arrowLeft'> &nbsp;Back</Button>
                  </div>
                  <table className="ms-Table" cellSpacing="0" style={{marginTop: '30px'}}>
                  <tbody>
                      {
                        this.props.fields.map((value: ICustomListField) => {
                          return (
                            <tr>
                              <td><Label>{value.title}
                              {value.required === true ? ' (*)': ''}
                              </Label></td>
                              <td>
                                { value.type == CustomListFieldType.string ?
                                  <input id={'input-' + value.title} className='ms-TextField-field' style={{marginBottom: '8px'}} defaultValue={this.state.data[this.state.selectedIndex][value.title]} />
                                : ''
                                }
                                { value.type == CustomListFieldType.number ?
                                  <input id={'input-' + value.title} className='ms-TextField-field' defaultValue={this.state.data[this.state.selectedIndex][value.title]} style={{width: '100px', marginBottom: '8px'}} />
                                : ''
                                }
                                { value.type == CustomListFieldType.boolean ?
                                  <div  style={{marginBottom: '8px'}}>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <Checkbox/>
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.date ?
                                  <div>
                                    <input id={'input-' + value.title} defaultValue={this.state.data[this.state.selectedIndex][value.title]} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldDatePickerHost initialDate={this.state.data[this.state.selectedIndex][value.title]} label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.dateTime ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldDateTimePickerHost initialDate={this.state.data[this.state.selectedIndex][value.title]} label="" onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.font ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldFontPickerHost label="" initialValue={this.state.data[this.state.selectedIndex][value.title]} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.fontSize ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldFontSizePickerHost label="" initialValue={this.state.data[this.state.selectedIndex][value.title]} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.color ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldColorPickerHost label="" initialColor={this.state.data[this.state.selectedIndex][value.title]} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.icon ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldIconPickerHost label="" initialValue={this.state.data[this.state.selectedIndex][value.title]} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.password ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldPasswordHost label="" initialValue={this.state.data[this.state.selectedIndex][value.title]} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.users ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldPeoplePickerHost label="" initialData={this.state.data[this.state.selectedIndex][value.title]}  context={this.props.context} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                                { value.type == CustomListFieldType.list ?
                                  <div>
                                    <input id={'input-' + value.title} style={{visibility: 'hidden'}}/>
                                    <PropertyFieldSPListPickerHost label="" selectedList={this.state.data[this.state.selectedIndex][value.title]}  context={this.props.context} onDispose={null} onRender={null} onPropertyChange={this.onPropertyChange} targetProperty={'input-' + value.title}  />
                                  </div>
                                : ''
                                }
                              </td>
                            </tr>
                          );
                        })
                      }
                  </tbody>
                  </table>
                  </div>
                : ''
               }
               <div style={{marginTop: '30px'}}>
                <Button buttonType={ButtonType.primary} onClick={this.onClickUpdate}>OK</Button>
                <Button buttonType={ButtonType.normal} onClick={this.onClickCancel}>Cancel</Button>
              </div>
          </div>
          : ''}

          { this.state.openListView === true ?
          <div>
              <div style={{marginBottom: '20px', backgroundColor: '#F4F4F4', width: '100%', padding: '5px'}}>
                <Button buttonType={ButtonType.hero} onClick={this.onClickAddItem} icon='plus'> &nbsp;Add item</Button>
                <Button buttonType={ButtonType.hero} onClick={this.onClickEdit} disabled={this.state.selectedIndex == null || this.state.selectedIndex < 0 ? true:false} icon='editBox'> &nbsp;Edit</Button>
                <Button buttonType={ButtonType.hero} onClick={this.onClickDeleteItem} disabled={this.state.selectedIndex == null || this.state.selectedIndex < 0 ? true:false} icon='trash'> &nbsp;Delete</Button>
              </div>
                 <Dialog type={DialogType.close} isOpen={this.state.deleteOpen} title="Confirm Delete"
                  onDismiss={this.onDismissDelete}  isDarkOverlay={false} isBlocking={true}>
                    <div>
                      <div>
                        <Label>Are you sure that you want to delete this item ?</Label>
                      </div>
                      <div style={{paddingTop:'20px'}}>
                        <Button buttonType={ButtonType.primary} onClick={this.clickDelete}>Yes</Button>
                        <Button buttonType={ButtonType.normal} onClick={this.onDismissDelete}>No</Button>
                      </div>
                    </div>
                 </Dialog>

                {this.props.fields != null ?
                  <table className="ms-Table" cellPadding="4" cellSpacing="0">
                  <thead>
                    <tr>
                      <th style={{width: '35px', backgroundColor: '#F4F4F4', borderBottom: '1px', borderBottomColor: '#999999', borderBottomStyle: 'solid'}}></th>
                      {
                        this.props.fields.map((value: ICustomListField) => {
                          if (value.hidden != true) {
                            return (
                              <th style={{backgroundColor: '#F4F4F4', borderBottom: '1px', borderBottomColor: '#999999', borderBottomStyle: 'solid'}}>
                                <Label style={{color: '#999999'}}>{value.title}</Label></th>
                            );
                          }
                        })
                      }
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.data != null ?
                        this.state.data.map((value: any, index: number) => {
                          return (
                            <tr style={{backgroundColor: index == this.state.selectedIndex ? '#E8E8E8': ''}}
                              onMouseEnter={index != this.state.selectedIndex ? this.onEnterHoverItem : null}
                              onMouseLeave={index != this.state.selectedIndex ? this.onLeaveHoverItem : null} >
                              <td style={{paddingLeft: '6px', height:'40px'}}>
                                <div style={{float: 'left'}}>
                                <input id={"bulletRadio" + index} className="ms-ChoiceField-input"
                                  type="radio" name="radio1" onChange={this.onChangeSelectedItem}
                                  value={index} defaultChecked={index == this.state.selectedIndex ? true: false}/>
                                <label htmlFor={"bulletRadio" + index} className="ms-ChoiceField-field">
                                  <span className="ms-Label">
                                  </span>
                                </label>
                              </div>
                              </td>
                            {
                              this.props.fields.map((field: ICustomListField) => {
                                if (field.hidden != true) {
                                  return (
                                    <td><Label htmlFor={"bulletRadio" + index} >{value[field.title]}</Label></td>
                                  );
                                }
                              })
                            }
                            </tr>
                          );
                        })
                      : ''
                    }
                  </tbody>
                  </table>
                : '' }

          </div>
          : '' }

        </Panel>

      </div>
    );
  }
}
