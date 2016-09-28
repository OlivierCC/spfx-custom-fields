/**
 * @file PropertyFieldSPListQueryHost.tsx
 * Renders the controls for PropertyFieldSPListQuery component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 */
import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-client-preview';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { EnvironmentType } from '@microsoft/sp-client-base';
import { IPropertyFieldSPListQueryPropsInternal, PropertyFieldSPListQueryOrderBy } from './PropertyFieldSPListQuery';

/**
 * @interface
 * PropertyFieldSPListQueryHost properties interface
 *
 */
export interface IPropertyFieldSPListQueryHostProps extends IPropertyFieldSPListQueryPropsInternal {
}

export interface IPropertyFieldSPListQueryHostState {
  lists: IDropdownOption[];
  fields: IDropdownOption[];
  arranged: IDropdownOption[];
  selectedList?: string;
  selectedField?: string;
  selectedArrange?: string;
  max?: number;
}

/**
 * @class
 * Renders the controls for PropertyFieldSPListQuery component
 */
export default class PropertyFieldSPListQueryHost extends React.Component<IPropertyFieldSPListQueryHostProps, IPropertyFieldSPListQueryHostState> {

  /**
   * @function
   * Contructor
   */
  constructor(props: IPropertyFieldSPListQueryHostProps) {
    super(props);
    this.onChangedList = this.onChangedList.bind(this);
    this.onChangedField = this.onChangedField.bind(this);
    this.onChangedArranged = this.onChangedArranged.bind(this);
    this.onChangedMax = this.onChangedMax.bind(this);
    this.loadFields = this.loadFields.bind(this);

    this.state = {
			lists: [],
      fields: [],
      arranged: [{key: 'asc', text: 'Asc', isSelected: true}, {key: 'desc', text: 'Desc'}],
      selectedList: '',
      selectedField: '',
      selectedArrange: '',
      max: 100
    };

    this.loadLists();
  }

  /**
   * @function
   * Loads the list from SharePoint current web site
   */
  private loadLists(): void {
    var listService: SPListPickerService = new SPListPickerService(this.props, this.props.context);
    listService.getLibs().then((response: ISPLists) => {
      this.state.lists = [];
      response.value.map((list: ISPList) => {
        var isSelected: boolean = false;
        if (this.props.selectedList == list.Id) {
          isSelected = true;
          this.state.selectedList = list.Id;
        }
        this.state.lists.push({
          key: list.Id,
          text: list.Title,
          isSelected: isSelected
        });
      });
      this.saveState();
    });
  }

  private loadFields(): void {
    var listService: SPListPickerService = new SPListPickerService(this.props, this.props.context);
    listService.getFields(this.state.selectedList).then((response: ISPFields) => {
      this.state.fields = [];
      response.value.map((list: ISPField) => {
        var isSelected: boolean = false;
        this.state.fields.push({
          key: list.StaticName,
          text: list.Title,
          isSelected: isSelected
        });
      });
      this.saveState();
    });
  }

  private saveState(): void {
      this.setState({
        selectedField: this.state.selectedField,
        selectedArrange: this.state.selectedArrange,
        selectedList: this.state.selectedList,
        lists: this.state.lists,
        fields: this.state.fields,
        max: this.state.max,
        arranged: this.state.arranged});
  }

  private saveQuery(): void {
    if (this.props.onPropertyChange) {

      var queryUrl: string = this.props.context.pageContext.web.absoluteUrl;
      queryUrl += "/_api/lists(guid'";
      queryUrl += this.state.selectedList
      queryUrl += "')/items?";
      queryUrl += "$orderBy=";
      queryUrl += this.state.selectedField;
      queryUrl += "%20";
      queryUrl += this.state.selectedArrange;
      queryUrl += '&$top=';
      queryUrl += this.state.max;

      this.props.onPropertyChange(this.props.targetProperty, queryUrl);
    }
  }

  /**
   * @function
   * Raises when a list has been selected
   */
  private onChangedList(option: IDropdownOption, index?: number): void {
    this.state.selectedList =  option.key as string;
    this.saveQuery();
    this.saveState();
    this.loadFields();
  }

   private onChangedField(option: IDropdownOption, index?: number): void {
    this.state.selectedField =  option.key as string;
    this.saveQuery();
    this.saveState();
  }

   private onChangedArranged(option: IDropdownOption, index?: number): void {
    this.state.selectedArrange =  option.key as string;
    this.saveQuery();
    this.saveState();
  }

  private onChangedMax(newValue?: number): void {
    this.state.max = newValue;
    this.saveQuery();
    this.saveState();
  }


  /**
   * @function
   * Renders the SPListpicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    //Renders content
    return (
      <div>
        <Dropdown
          label="List"
          onChanged={this.onChangedList}
          options={this.state.lists}
          selectedKey={this.state.selectedList}
        />
        <Dropdown
          label="Order By"
          options={this.state.fields}
          selectedKey={this.state.selectedField}
          onChanged={this.onChangedField}
          isDisabled={this.state.selectedList != null && this.state.selectedList != '' ? false : true }
        />
        <Dropdown
          label="Arranged"
          options={this.state.arranged}
          selectedKey={this.state.selectedArrange}
          onChanged={this.onChangedArranged}
          isDisabled={this.state.selectedList != null && this.state.selectedList != '' ? false : true }
        />
        <Slider label="Max"
          min={0}
          max={500}
          defaultValue={this.state.max}
          onChange={this.onChangedMax}
          disabled={this.state.selectedList != null && this.state.selectedList != '' ? false : true }
        />
      </div>
    );
  }
}

/**
 * @interface
 * Defines a collection of SharePoint lists
 */
interface ISPLists {
  value: ISPList[];
}

/**
 * @interface
 * Defines a SharePoint list
 */
interface ISPList {
  Title: string;
  Id: string;
  BaseTemplate: string;
}

interface ISPField {
  Title: string;
  StaticName: string;
}

interface ISPFields {
  value: ISPField[];
}

/**
 * @class
 * Service implementation to get list & list items from current SharePoint site
 */
class SPListPickerService {

  private context: IWebPartContext;
  private props: IPropertyFieldSPListQueryHostProps;

  /**
   * @function
   * Service constructor
   */
  constructor(_props: IPropertyFieldSPListQueryHostProps, pageContext: IWebPartContext){
      this.props = _props;
      this.context = pageContext;
  }

  public getFields(listId: string): Promise<ISPFields> {
    if (this.context.environment.type === EnvironmentType.Local) {
      //If the running environment is local, load the data from the mock
      return this.getFieldsFromMock();
    }
    else {
      var queryUrl: string = this.context.pageContext.web.absoluteUrl;
      queryUrl += "/_api/lists(guid'";
      queryUrl += listId;
      queryUrl += "')/Fields?$select=Title,StaticName&$orderBy=Title&$filter=Hidden%20eq%20false";
      return this.context.httpClient.get(queryUrl).then((response: Response) => {
          return response.json();
      });
    }
  }

  /**
   * @function
   * Gets the collection of libs in the current SharePoint site
   */
  public getLibs(): Promise<ISPLists> {
    if (this.context.environment.type === EnvironmentType.Local) {
      //If the running environment is local, load the data from the mock
      return this.getLibsFromMock();
    }
    else {
      //If the running environment is SharePoint, request the lists REST service
      var queryUrl: string = this.context.pageContext.web.absoluteUrl;
      queryUrl += "/_api/lists?$select=Title,id,BaseTemplate";
      if (this.props.orderBy != null) {
        queryUrl += "&$orderby=";
        if (this.props.orderBy == PropertyFieldSPListQueryOrderBy.Id)
          queryUrl += "Id";
        else if (this.props.orderBy == PropertyFieldSPListQueryOrderBy.Title)
          queryUrl += "Title";
      }
      if (this.props.baseTemplate != null && this.props.baseTemplate) {
        queryUrl += "&$filter=BaseTemplate%20eq%20";
        queryUrl += this.props.baseTemplate;
        if (this.props.includeHidden === false) {
          queryUrl += "%20and%20Hidden%20eq%20false";
        }
      }
      else {
        if (this.props.includeHidden === false) {
          queryUrl += "&$filter=Hidden%20eq%20false";
        }
      }
      return this.context.httpClient.get(queryUrl).then((response: Response) => {
          return response.json();
      });
    }
  }

  /**
   * @function
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getLibsFromMock(): Promise<ISPLists> {
    return SPListPickerMockHttpClient.getLists(this.context.pageContext.web.absoluteUrl).then(() => {
          const listData: ISPLists = {
              value:
              [
                  { Title: 'Mock List One', Id: '6770c83b-29e8-494b-87b6-468a2066bcc6', BaseTemplate: '109' },
                  { Title: 'Mock List Two', Id: '2ece98f2-cc5e-48ff-8145-badf5009754c', BaseTemplate: '109' },
                  { Title: 'Mock List Three', Id: 'bd5dbd33-0e8d-4e12-b289-b276e5ef79c2', BaseTemplate: '109' }
              ]
          };
          return listData;
      }) as Promise<ISPLists>;
  }

   private getFieldsFromMock(): Promise<ISPFields> {
    return SPListPickerMockHttpClient.getFields(this.context.pageContext.web.absoluteUrl).then(() => {
          const listData: ISPFields = {
              value:
              [
                  { Title: 'ID', StaticName: 'ID'},
                  { Title: 'Title', StaticName: 'Title'},
                  { Title: 'Created', StaticName: 'Created'},
                  { Title: 'Modified', StaticName: 'Modified'}
              ]
          };
          return listData;
      }) as Promise<ISPFields>;
  }

}


/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
class SPListPickerMockHttpClient {

    /**
     * @var
     * Mock SharePoint result sample
     */
    private static _results: ISPLists = { value: []};
    private static _resultsF: ISPFields = { value: []};

    /**
     * @function
     * Mock search People method
     */
    public static getLists(restUrl: string, options?: any): Promise<ISPLists> {
      return new Promise<ISPLists>((resolve) => {
            resolve(SPListPickerMockHttpClient._results);
        });
    }

    public static getFields(restUrl: string, options?: any): Promise<ISPFields> {
      return new Promise<ISPFields>((resolve) => {
            resolve(SPListPickerMockHttpClient._resultsF);
        });
    }

}
