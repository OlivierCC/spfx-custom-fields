/**
 * @file PropertyFieldIconPickerHost.tsx
 * Renders the controls for PropertyFieldIconPicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldIconPickerPropsInternal } from './PropertyFieldIconPicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * @interface
 * PropertyFieldIconPickerHost properties interface
 *
 */
export interface IPropertyFieldIconPickerHostProps extends IPropertyFieldIconPickerPropsInternal {
}

/**
 * @interface
 * PropertyFieldIconPickerHost state interface
 *
 */
export interface IPropertyFieldIconPickerHostState {
  isOpen: boolean;
  isHoverDropdown?: boolean;
  hoverFont?: string;
  selectedFont?: string;
  safeSelectedFont?: string;
}

/**
 * @interface
 * Define a safe font object
 *
 */
interface ISafeFont {
  Name: string;
  SafeValue: string;
}

/**
 * @class
 * Renders the controls for PropertyFieldIconPicker component
 */
export default class PropertyFieldIconPickerHost extends React.Component<IPropertyFieldIconPickerHostProps, IPropertyFieldIconPickerHostState> {
  /**
   * @var
   * Defines the font series
   */
  private fonts: ISafeFont[] = [
    {Name: "circleEmpty", SafeValue: 'ms-Icon--circleEmpty'},
    {Name: "circleFill", SafeValue: 'ms-Icon--circleFill'},
    {Name: "placeholder", SafeValue: 'ms-Icon--placeholder'},
    {Name: "star", SafeValue: 'ms-Icon--star'},
    {Name: "plus", SafeValue: 'ms-Icon--plus'},
    {Name: "minus", SafeValue: 'ms-Icon--minus'},
    {Name: "question", SafeValue: 'ms-Icon--question'},
    {Name: "exclamation", SafeValue: 'ms-Icon--exclamation'},
    {Name: "person", SafeValue: 'ms-Icon--person'},
    {Name: "mail", SafeValue: 'ms-Icon--mail'},
    {Name: "infoCircle", SafeValue: 'ms-Icon--infoCircle'},
    {Name: "alert", SafeValue: 'ms-Icon--alert'},
    {Name: "xCircle", SafeValue: 'ms-Icon--xCircle'},
    {Name: "mailOpen", SafeValue: 'ms-Icon--mailOpen'},
    {Name: "people", SafeValue: 'ms-Icon--people'},
    {Name: "bell", SafeValue: 'ms-Icon--bell'},
    {Name: "calendar", SafeValue: 'ms-Icon--calendar'},
    {Name: "scheduling", SafeValue: 'ms-Icon--scheduling'},
    {Name: "event", SafeValue: 'ms-Icon--event'},
    {Name: "folder", SafeValue: 'ms-Icon--folder'},
    {Name: "documents", SafeValue: 'ms-Icon--documents'},
    {Name: "chat", SafeValue: 'ms-Icon--chat'},
    {Name: "sites", SafeValue: 'ms-Icon--sites'},
    {Name: "listBullets", SafeValue: 'ms-Icon--listBullets'},
    {Name: "calendarWeek", SafeValue: 'ms-Icon--calendarWeek'},
    {Name: "calendarWorkWeek", SafeValue: 'ms-Icon--calendarWorkWeek'},
    {Name: "calendarDay", SafeValue: 'ms-Icon--calendarDay'},
    {Name: "folderMove", SafeValue: 'ms-Icon--folderMove'},
    {Name: "panel", SafeValue: 'ms-Icon--panel'},
    {Name: "popout", SafeValue: 'ms-Icon--popout'},
    {Name: "menu", SafeValue: 'ms-Icon--menu'},
    {Name: "home", SafeValue: 'ms-Icon--home'},
    {Name: "favorites", SafeValue: 'ms-Icon--favorites'},
    {Name: "phone", SafeValue: 'ms-Icon--phone'},
    {Name: "mailSend", SafeValue: 'ms-Icon--mailSend'},
    {Name: "save", SafeValue: 'ms-Icon--save'},
    {Name: "trash", SafeValue: 'ms-Icon--trash'},
    {Name: "pencil", SafeValue: 'ms-Icon--pencil'},
    {Name: "flag", SafeValue: 'ms-Icon--flag'},
    {Name: "reply", SafeValue: 'ms-Icon--reply'},
    {Name: "miniatures", SafeValue: 'ms-Icon--miniatures'},
    {Name: "voicemail", SafeValue: 'ms-Icon--voicemail'},
    {Name: "play", SafeValue: 'ms-Icon--play'},
    {Name: "pause", SafeValue: 'ms-Icon--pause'},
    {Name: "onlineAdd", SafeValue: 'ms-Icon--onlineAdd'},
    {Name: "onlineJoin", SafeValue: 'ms-Icon--onlineJoin'},
    {Name: "replyAll", SafeValue: 'ms-Icon--replyAll'},
    {Name: "attachment", SafeValue: 'ms-Icon--attachment'},
    {Name: "drm", SafeValue: 'ms-Icon--drm'},
    {Name: "pinDown", SafeValue: 'ms-Icon--pinDown'},
    {Name: "refresh", SafeValue: 'ms-Icon--refresh'},
    {Name: "gear", SafeValue: 'ms-Icon--gear'},
    {Name: "smiley", SafeValue: 'ms-Icon--smiley'},
    {Name: "info", SafeValue: 'ms-Icon--info'},
    {Name: "lock", SafeValue: 'ms-Icon--lock'},
    {Name: "search", SafeValue: 'ms-Icon--search'},
    {Name: "questionReverse", SafeValue: 's-Icon--questionReverse'},
    {Name: "notRecurring", SafeValue: 'ms-Icon--notRecurring'},
    {Name: "tasks", SafeValue: 'ms-Icon--tasks'},
    {Name: "check", SafeValue: 'ms-Icon--check'},
    {Name: "x", SafeValue: 'ms-Icon--x'},
    {Name: "ellipsis", SafeValue: 'ms-Icon--ellipsis'},
    {Name: "dot", SafeValue: 'ms-Icon--dot'},
    {Name: "arrowUp", SafeValue: 'ms-Icon--arrowUp'},
    {Name: "arrowDown", SafeValue: 'ms-Icon--arrowDown'},
    {Name: "arrowLeft", SafeValue: 'ms-Icon--arrowLeft'},
    {Name: "arrowRight", SafeValue: 'ms-Icon--arrowRight'},
    {Name: "download", SafeValue: 'ms-Icon--download'},
    {Name: "directions", SafeValue: 'ms-Icon--directions'},
    {Name: "microphone", SafeValue: 'ms-Icon--microphone'},
    {Name: "caretUp", SafeValue: 'ms-Icon--caretUp'},
    {Name: "caretDown", SafeValue: 'ms-Icon--caretDown'},
    {Name: "caretLeft", SafeValue: 'ms-Icon--caretLeft'},
    {Name: "caretRight", SafeValue: 'ms-Icon--caretRight'},
    {Name: "caretUpLeft", SafeValue: 'ms-Icon--caretUpLeft'},
    {Name: "caretUpRight", SafeValue: 'ms-Icon--caretUpRight'},
    {Name: "caretDownRight", SafeValue: 'ms-Icon--caretDownRight'},
    {Name: "caretDownLeft", SafeValue: 'ms-Icon--caretDownLeft'},
    {Name: "note", SafeValue: 'ms-Icon--note'},
    {Name: "noteReply", SafeValue: 'ms-Icon--noteReply'},
    {Name: "noteForward", SafeValue: 'ms-Icon--noteForward'},
    {Name: "key", SafeValue: 'ms-Icon--key'},
    {Name: "tile", SafeValue: 'ms-Icon--tile'},
    {Name: "taskRecurring", SafeValue: 'ms-Icon--taskRecurring'},
    {Name: "starEmpty", SafeValue: 'ms-Icon--starEmpty'},
    {Name: "upload", SafeValue: 'ms-Icon--upload'},
    {Name: "wrench", SafeValue: 'ms-Icon--wrench'},
    {Name: "share", SafeValue: 'ms-Icon--share'},
    {Name: "documentReply", SafeValue: 'ms-Icon--documentReply'},
    {Name: "documentForward", SafeValue: 'ms-Icon--documentForward'},
    {Name: "partner", SafeValue: 'ms-Icon--partner'},
    {Name: "reactivate", SafeValue: 'ms-Icon--reactivate'},
    {Name: "sort", SafeValue: 'ms-Icon--sort'},
    {Name: "personAdd", SafeValue: 'ms-Icon--personAdd'},
    {Name: "chevronUp", SafeValue: 'ms-Icon--chevronUp'},
    {Name: "chevronDown", SafeValue: 'ms-Icon--chevronDown'},
    {Name: "chevronLeft", SafeValue: 'ms-Icon--chevronLeft'},
    {Name: "chevronRight", SafeValue: 'ms-Icon--chevronRight'},
    {Name: "peopleAdd", SafeValue: 'ms-Icon--peopleAdd'},
    {Name: "newsfeed", SafeValue: 'ms-Icon--newsfeed'},
    {Name: "notebook", SafeValue: 'ms-Icon--notebook'},
    {Name: "link", SafeValue: 'ms-Icon--link'},
    {Name: "chevronsUp", SafeValue: 'ms-Icon--chevronsUp'},
    {Name: "chevronsDown", SafeValue: 'ms-Icon--chevronsDown'},
    {Name: "chevronsLeft", SafeValue: 'ms-Icon--chevronsLeft'},
    {Name: "chevronsRight", SafeValue: 'ms-Icon--chevronsRight'},
    {Name: "clutter", SafeValue: 'ms-Icon--clutter'},
    {Name: "subscribe", SafeValue: 'ms-Icon--subscribe'},
    {Name: "unsubscribe", SafeValue: 'ms-Icon--unsubscribe'},
    {Name: "personRemove", SafeValue: 'ms-Icon--personRemove'},
    {Name: "receiptForward", SafeValue: 'ms-Icon--receiptForward'},
    {Name: "receiptReply", SafeValue: 'ms-Icon--receiptReply'},
    {Name: "receiptCheck", SafeValue: 'ms-Icon--receiptCheck'},
    {Name: "peopleRemove", SafeValue: 'ms-Icon--peopleRemove'},
    {Name: "merge", SafeValue: 'ms-Icon--merge'},
    {Name: "split", SafeValue: 'ms-Icon--split'},
    {Name: "eventCancel", SafeValue: 'ms-Icon--eventCancel'},
    {Name: "eventShare", SafeValue: 'ms-Icon--eventShare'},
    {Name: "today", SafeValue: 'ms-Icon--today'},
    {Name: "oofReply", SafeValue: 'ms-Icon--oofReply'},
    {Name: "voicemailReply", SafeValue: 'ms-Icon--voicemailReply'},
    {Name: "voicemailForward", SafeValue: 'ms-Icon--voicemailForward'},
    {Name: "ribbon", SafeValue: 'ms-Icon--ribbon'},
    {Name: "contact", SafeValue: 'ms-Icon--contact'},
    {Name: "eye", SafeValue: 'ms-Icon--eye'},
    {Name: "glasses", SafeValue: 'ms-Icon--glasses'},
    {Name: "print", SafeValue: 'ms-Icon--print'},
    {Name: "room", SafeValue: 'ms-Icon--room'},
    {Name: "post", SafeValue: 'ms-Icon--post'},
    {Name: "toggle", SafeValue: 'ms-Icon--toggle'},
    {Name: "touch", SafeValue: 'ms-Icon--touch'},
    {Name: "clock", SafeValue: 'ms-Icon--clock'},
    {Name: "fax", SafeValue: 'ms-Icon--fax'},
    {Name: "lightning", SafeValue: 'ms-Icon--lightning'},
    {Name: "dialpad", SafeValue: 'ms-Icon--dialpad'},
    {Name: "phoneTransfer", SafeValue: 'ms-Icon--phoneTransfer'},
    {Name: "phoneAdd", SafeValue: 'ms-Icon--phoneAdd'},
    {Name: "late", SafeValue: 'ms-Icon--late'},
    {Name: "chatAdd", SafeValue: 'ms-Icon--chatAdd'},
    {Name: "conflict", SafeValue: 'ms-Icon--conflict'},
    {Name: "navigate", SafeValue: 'ms-Icon--navigate'},
    {Name: "camera", SafeValue: 'ms-Icon--camera'},
    {Name: "filter", SafeValue: 'ms-Icon--filter'},
    {Name: "fullscreen", SafeValue: 'ms-Icon--fullscreen'},
    {Name: "new", SafeValue: 'ms-Icon--new'},
    {Name: "mailEmpty", SafeValue: 'ms-Icon--mailEmpty'},
    {Name: "editBox", SafeValue: 'ms-Icon--editBox'},
    {Name: "waffle", SafeValue: 'ms-Icon--waffle'},
    {Name: "work", SafeValue: 'ms-Icon--work'},
    {Name: "eventRecurring", SafeValue: 'ms-Icon--eventRecurring'},
    {Name: "cart", SafeValue: 'ms-Icon--cart'},
    {Name: "socialListening", SafeValue: 'ms-Icon--socialListening'},
    {Name: "mapMarker", SafeValue: 'ms-Icon--mapMarker'},
    {Name: "org", SafeValue: 'ms-Icon--org'},
    {Name: "replyAlt", SafeValue: 'ms-Icon--replyAlt'},
    {Name: "replyAllAlt", SafeValue: 'ms-Icon--replyAllAlt'},
    {Name: "eventInfo", SafeValue: 'ms-Icon--eventInfo'},
    {Name: "group", SafeValue: 'ms-Icon--group'},
    {Name: "money", SafeValue: 'ms-Icon--money'},
    {Name: "graph", SafeValue: 'ms-Icon--graph'},
    {Name: "noteEdit", SafeValue: 'ms-Icon--noteEdit'},
    {Name: "dashboard", SafeValue: 'ms-Icon--dashboard'},
    {Name: "mailEdit", SafeValue: 'ms-Icon--mailEdit'},
    {Name: "pinLeft", SafeValue: 'ms-Icon--pinLeft'},
    {Name: "heart", SafeValue: 'ms-Icon--heart'},
    {Name: "heartEmpty", SafeValue: 'ms-Icon--heartEmpty'},
    {Name: "picture", SafeValue: 'ms-Icon--picture'},
    {Name: "cake", SafeValue: 'ms-Icon--cake'},
    {Name: "books", SafeValue: 'ms-Icon--books'},
    {Name: "chart", SafeValue: 'ms-Icon--chart'},
    {Name: "video", SafeValue: 'ms-Icon--video'},
    {Name: "soccer", SafeValue: 'ms-Icon--soccer'},
    {Name: "meal", SafeValue: 'ms-Icon--meal'},
    {Name: "balloon", SafeValue: 'ms-Icon--balloon'},
    {Name: "cat", SafeValue: 'ms-Icon--cat'},
    {Name: "dog", SafeValue: 'ms-Icon--dog'},
    {Name: "bag", SafeValue: 'ms-Icon--bag'},
    {Name: "music", SafeValue: 'ms-Icon--music'},
    {Name: "stopwatch", SafeValue: 'ms-Icon--stopwatch'},
    {Name: "coffee", SafeValue: 'ms-Icon--coffee'},
    {Name: "briefcase", SafeValue: 'ms-Icon--briefcase'},
    {Name: "pill", SafeValue: 'ms-Icon--pill'},
    {Name: "trophy", SafeValue: 'ms-Icon--trophy'},
    {Name: "firstAid", SafeValue: 'ms-Icon--firstAid'},
    {Name: "plane", SafeValue: 'ms-Icon--plane'},
    {Name: "page", SafeValue: 'ms-Icon--page'},
    {Name: "car", SafeValue: 'ms-Icon--car'},
    {Name: "dogAlt", SafeValue: 'ms-Icon--dogAlt'},
    {Name: "document", SafeValue: 'ms-Icon--document'},
    {Name: "metadata", SafeValue: 'ms-Icon--metadata'},
    {Name: "pointItem", SafeValue: 'ms-Icon--pointItem'},
    {Name: "text", SafeValue: 'ms-Icon--text'},
    {Name: "fieldText", SafeValue: 'ms-Icon--fieldText'},
    {Name: "fieldNumber", SafeValue: 'ms-Icon--fieldNumber'},
    {Name: "dropdown", SafeValue: 'ms-Icon--dropdown'},
    {Name: "radioButton", SafeValue: 'ms-Icon--radioButton'},
    {Name: "checkbox", SafeValue: 'ms-Icon--checkbox'},
    {Name: "story", SafeValue: 'ms-Icon--story'},
    {Name: "bold", SafeValue: 'ms-Icon--bold'},
    {Name: "italic", SafeValue: 'ms-Icon--italic'},
    {Name: "underline", SafeValue: 'ms-Icon--underline'},
    {Name: "quote", SafeValue: 'ms-Icon--quote'},
    {Name: "styleRemove", SafeValue: 'ms-Icon--styleRemove'},
    {Name: "pictureAdd", SafeValue: 'ms-Icon--pictureAdd'},
    {Name: "pictureRemove", SafeValue: 'ms-Icon--pictureRemove'},
    {Name: "desktop", SafeValue: 'ms-Icon--desktop'},
    {Name: "tablet", SafeValue: 'ms-Icon--tablet'},
    {Name: "mobile", SafeValue: 'ms-Icon--mobile'},
    {Name: "table", SafeValue: 'ms-Icon--table'},
    {Name: "hide", SafeValue: 'ms-Icon--hide'},
    {Name: "shield", SafeValue: 'ms-Icon--shield'},
    {Name: "header", SafeValue: 'ms-Icon--header'},
    {Name: "paint", SafeValue: 'ms-Icon--paint'},
    {Name: "support", SafeValue: 'ms-Icon--support'},
    {Name: "settings", SafeValue: 'ms-Icon--settings'},
    {Name: "creditCard", SafeValue: 'ms-Icon--creditCard'},
    {Name: "reload", SafeValue: 'ms-Icon--reload'},
    {Name: "peopleSecurity", SafeValue: 'ms-Icon--peopleSecurity'},
    {Name: "fieldTextBox", SafeValue: 'ms-Icon--fieldTextBox'},
    {Name: "multiChoice", SafeValue: 'ms-Icon--multiChoice'},
    {Name: "fieldMail", SafeValue: 'ms-Icon--fieldMail'},
    {Name: "contactForm", SafeValue: 'ms-Icon--contactForm'},
    {Name: "circleHalfFilled", SafeValue: 'ms-Icon--circleHalfFilled'},
    {Name: "documentPDF", SafeValue: 'ms-Icon--documentPDF'},
    {Name: "bookmark", SafeValue: 'ms-Icon--bookmark'},
    {Name: "circleUnfilled", SafeValue: 'ms-Icon--circleUnfilled'},
    {Name: "circleFilled", SafeValue: 'ms-Icon--circleFilled'},
    {Name: "textBox", SafeValue: 'ms-Icon--textBox'},
    {Name: "drop", SafeValue: 'ms-Icon--drop'},
    {Name: "sun", SafeValue: 'ms-Icon--sun'},
    {Name: "lifesaver", SafeValue: 'ms-Icon--lifesaver'},
    {Name: "lifesaverLock", SafeValue: 'ms-Icon--lifesaverLock'},
    {Name: "mailUnread", SafeValue: 'ms-Icon--mailUnread'},
    {Name: "mailRead", SafeValue: 'ms-Icon--mailRead'},
    {Name: "inboxCheck", SafeValue: 'ms-Icon--inboxCheck'},
    {Name: "folderSearch", SafeValue: 'ms-Icon--folderSearch'},
    {Name: "collapse", SafeValue: 'ms-Icon--collapse'},
    {Name: "expand", SafeValue: 'ms-Icon--expand'},
    {Name: "ascending", SafeValue: 'ms-Icon--ascending'},
    {Name: "descending", SafeValue: 'ms-Icon--descending'},
    {Name: "filterClear", SafeValue: 'ms-Icon--filterClear'},
    {Name: "checkboxEmpty", SafeValue: 'ms-Icon--checkboxEmpty'},
    {Name: "checkboxMixed", SafeValue: 'ms-Icon--checkboxMixed'},
    {Name: "boards", SafeValue: 'ms-Icon--boards'},
    {Name: "checkboxCheck", SafeValue: 'ms-Icon--checkboxCheck'},
    {Name: "rowny", SafeValue: 'ms-Icon--frowny'},
    {Name: "lightBulb", SafeValue: 'ms-Icon--lightBulb'},
    {Name: "globe", SafeValue: 'ms-Icon--globe'},
    {Name: "deviceWipe", SafeValue: 'ms-Icon--deviceWipe'},
    {Name: "listCheck", SafeValue: 'ms-Icon--listCheck'},
    {Name: "listGroup", SafeValue: 'ms-Icon--listGroup'},
    {Name: "timeline", SafeValue: 'ms-Icon--timeline'},
    {Name: "fontIncrease", SafeValue: 'ms-Icon--fontIncrease'},
    {Name: "fontDecrease", SafeValue: 'ms-Icon--fontDecrease'},
    {Name: "fontColor", SafeValue: 'ms-Icon--fontColor'},
    {Name: "mailCheck", SafeValue: 'ms-Icon--mailCheck'},
    {Name: "mailDown", SafeValue: 'ms-Icon--mailDown'},
    {Name: "listCheckbox", SafeValue: 'ms-Icon--listCheckbox'},
    {Name: "sunAdd", SafeValue: 'ms-Icon--sunAdd'},
    {Name: "sunQuestion", SafeValue: 'ms-Icon--sunQuestion'},
    {Name: "chevronThinUp", SafeValue: 'ms-Icon--chevronThinUp'},
    {Name: "chevronThinDown", SafeValue: 'ms-Icon--chevronThinDown'},
    {Name: "chevronThinLeft", SafeValue: 'ms-Icon--chevronThinLeft'},
    {Name: "chevronThinRight", SafeValue: 'ms-Icon--chevronThinRight'},
    {Name: "chevronThickUp", SafeValue: 'ms-Icon--chevronThickUp'},
    {Name: "chevronThickDown", SafeValue: 'ms-Icon--chevronThickDown'},
    {Name: "chevronThickLeft", SafeValue: 'ms-Icon--chevronThickLeft'},
    {Name: "chevronThickRight", SafeValue: 'ms-Icon--chevronThickRight'},
    {Name: "linkRemove", SafeValue: 'ms-Icon--linkRemove'},
    {Name: "alertOutline", SafeValue: 'ms-Icon--alertOutline'},
    {Name: "documentLandscape", SafeValue: 'ms-Icon--documentLandscape'},
    {Name: "documentAdd", SafeValue: 'ms-Icon--documentAdd'},
    {Name: "toggleMiddle", SafeValue: 'ms-Icon--toggleMiddle'},
    {Name: "embed", SafeValue: 'ms-Icon--embed'},
    {Name: "listNumbered", SafeValue: 'ms-Icon--listNumbered'},
    {Name: "peopleCheck", SafeValue: 'ms-Icon--peopleCheck'},
    {Name: "caretUpOutline", SafeValue: 'ms-Icon--caretUpOutline'},
    {Name: "caretDownOutline", SafeValue: 'ms-Icon--caretDownOutline'},
    {Name: "caretLeftOutline", SafeValue: 'ms-Icon--caretLeftOutline'},
    {Name: "caretRightOutline", SafeValue: 'ms-Icon--caretRightOutline'},
    {Name: "mailSync", SafeValue: 'ms-Icon--mailSync'},
    {Name: "mailError", SafeValue: 'ms-Icon--mailError'},
    {Name: "mailPause", SafeValue: 'ms-Icon--mailPause'},
    {Name: "peopleSync", SafeValue: 'ms-Icon--peopleSync'},
    {Name: "peopleError", SafeValue: 'ms-Icon--peopleError'},
    {Name: "peoplePause", SafeValue: 'ms-Icon--peoplePause'},
    {Name: "circleBall", SafeValue: 'ms-Icon--circleBall'},
    {Name: "circleBalloons", SafeValue: 'ms-Icon--circleBalloons'},
    {Name: "circleCar", SafeValue: 'ms-Icon--circleCar'},
    {Name: "circleCat", SafeValue: 'ms-Icon--circleCat'},
    {Name: "circleCoffee", SafeValue: 'ms-Icon--circleCoffee'},
    {Name: "circleDog", SafeValue: 'ms-Icon--circleDog'},
    {Name: "circleLightning", SafeValue: 'ms-Icon--circleLightning'},
    {Name: "circlePill", SafeValue: 'ms-Icon--circlePill'},
    {Name: "circlePlane", SafeValue: 'ms-Icon--circlePlane'},
    {Name: "circlePoodle", SafeValue: 'ms-Icon--circlePoodle'},
    {Name: "checkPeople", SafeValue: 'ms-Icon--checkPeople'},
    {Name: "documentSearch", SafeValue: 'ms-Icon--documentSearch'},
    {Name: "sortLines", SafeValue: 'ms-Icon--sortLines'},
    {Name: "calendarPublic", SafeValue: 'ms-Icon--calendarPublic'},
    {Name: "contactPublic", SafeValue: 'ms-Icon--contactPublic'},
    {Name: "triangleUp", SafeValue: 'ms-Icon--triangleUp'},
    {Name: "triangleRight", SafeValue: 'ms-Icon--triangleRight'},
    {Name: "triangleDown", SafeValue: 'ms-Icon--triangleDown'},
    {Name: "triangleLeft", SafeValue: 'ms-Icon--triangleLeft'},
    {Name: "triangleEmptyUp", SafeValue: 'ms-Icon--triangleEmptyUp'},
    {Name: "triangleEmptyRight", SafeValue: 'ms-Icon--triangleEmptyRight'},
    {Name: "triangleEmptyDown", SafeValue: 'ms-Icon--triangleEmptyDown'},
    {Name: "triangleEmptyLeft", SafeValue: 'ms-Icon--triangleEmptyLeft'},
    {Name: "filePDF", SafeValue: 'ms-Icon--filePDF'},
    {Name: "fileImage", SafeValue: 'ms-Icon--fileImage'},
    {Name: "fileDocument", SafeValue: 'ms-Icon--fileDocument'},
    {Name: "listGroup2", SafeValue: 'ms-Icon--listGroup2'},
    {Name: "copy", SafeValue: 'ms-Icon--copy'},
    {Name: "creditCardOutline", SafeValue: 'ms-Icon--creditCardOutline'},
    {Name: "mailPublic", SafeValue: 'ms-Icon--mailPublic'},
    {Name: "folderPublic", SafeValue: 'ms-Icon--folderPublic'},
    {Name: "teamwork", SafeValue: 'ms-Icon--teamwork'},
    {Name: "move", SafeValue: 'ms-Icon--move'},
    {Name: "classroom", SafeValue: 'ms-Icon--classroom'},
    {Name: "menu2", SafeValue: 'ms-Icon--menu2'},
    {Name: "plus2", SafeValue: 'ms-Icon--plus2'},
    {Name: "tag", SafeValue: 'ms-Icon--tag'},
    {Name: "arrowUp2", SafeValue: 'ms-Icon--arrowUp2'},
    {Name: "arrowDown2", SafeValue: 'ms-Icon--arrowDown2'},
    {Name: "circlePlus", SafeValue: 'ms-Icon--circlePlus'},
    {Name: "circleInfo", SafeValue: 'ms-Icon--circleInfo'},
    {Name: "section", SafeValue: 'ms-Icon--section'},
    {Name: "sections", SafeValue: 'ms-Icon--sections'},
    {Name: "at", SafeValue: 'ms-Icon--at'},
    {Name: "arrowUpRight", SafeValue: 'ms-Icon--arrowUpRight'},
    {Name: "arrowDownRight", SafeValue: 'ms-Icon--arrowDownRight'},
    {Name: "arrowDownLeft", SafeValue: 'ms-Icon--arrowDownLeft'},
    {Name: "arrowUpLeft", SafeValue: 'ms-Icon--arrowUpLeft'},
    {Name: "bundle", SafeValue: 'ms-Icon--bundle'},
    {Name: "pictureEdit", SafeValue: 'ms-Icon--pictureEdit'},
    {Name: "protectionCenter", SafeValue: 'ms-Icon--protectionCenter'},
    {Name: "alert2", SafeValue: 'ms-Icon--alert2'}
  ];

  /**
   * @function
   * Contructor
   */
  constructor(props: IPropertyFieldIconPickerHostProps) {
    super(props);

    //Bind the current object to the external called onSelectDate method
    this.onOpenDialog = this.onOpenDialog.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.toggleHoverLeave = this.toggleHoverLeave.bind(this);
    this.onClickFont = this.onClickFont.bind(this);
    this.onFontDropdownChanged = this.onFontDropdownChanged.bind(this);
    this.mouseEnterDropDown = this.mouseEnterDropDown.bind(this);
    this.mouseLeaveDropDown = this.mouseLeaveDropDown.bind(this);

    if (this.props.orderAlphabetical === true)
      this.orderAlphabetical();

    //Init the state
    this.state = {
        isOpen: false,
        isHoverDropdown: false
      };

    //Inits the default value
    if (props.initialValue != null && props.initialValue != '') {
      for (var i = 0; i < this.fonts.length; i++) {
        var font = this.fonts[i];
        if (font.SafeValue == props.initialValue) {
          this.state.selectedFont = font.Name;
          this.state.safeSelectedFont = font.SafeValue;
        }
      }
    }
  }

  /**
   * @function
   * Orders the font list
   */
  private orderAlphabetical(): void {
    this.fonts.sort(this.compare);
  }

  private compare(a: ISafeFont, b: ISafeFont) {
    if (a.Name < b.Name)
      return -1;
    if (a.Name > b.Name)
      return 1;
    return 0;
  }

  /**
   * @function
   * Function to refresh the Web Part properties
   */
  private changeSelectedFont(newValue: string): void {
    //Checks if there is a method to called
    if (this.props.onPropertyChange && newValue != null) {
      this.props.onPropertyChange(this.props.targetProperty, newValue);
    }
  }

  /**
   * @function
   * Function to open the dialog
   */
  private onOpenDialog(): void {
    this.state.isOpen = !this.state.isOpen;
    this.setState(this.state);
  }

  /**
   * @function
   * Mouse is hover a font
   */
  private toggleHover(element?: any) {
    var hoverFont: string = element.currentTarget.textContent;
    this.state.hoverFont = hoverFont;
    this.setState(this.state);
  }

  /**
   * @function
   * Mouse is leaving a font
   */
  private toggleHoverLeave(element?: any) {
    this.state.hoverFont = '';
    this.setState(this.state);
  }

  /**
   * @function
   * Mouse is hover the fontpicker
   */
  private mouseEnterDropDown(element?: any) {
    this.state.isHoverDropdown = true;
    this.setState(this.state);
  }

  /**
   * @function
   * Mouse is leaving the fontpicker
   */
  private mouseLeaveDropDown(element?: any) {
    this.state.isHoverDropdown = false;
    this.setState(this.state);
  }

  /**
   * @function
   * User clicked on a font
   */
  private onClickFont(element?: any) {
    var clickedFont: string = element.currentTarget.textContent;
    this.state.selectedFont = clickedFont;
    this.state.safeSelectedFont = this.getSafeFont(clickedFont);
    this.onOpenDialog();
    this.changeSelectedFont(this.state.safeSelectedFont);
    this.setState(this.state);
  }

  /**
   * @function
   * Gets a safe font value from a font name
   */
  private getSafeFont(fontName: string): string {
    for (var i = 0; i < this.fonts.length; i++) {
      var font = this.fonts[i];
      if (font.Name === fontName)
        return font.SafeValue;
    }
    return '';
  }

  /**
   * @function
   * The font dropdown selected value changed (used when the previewFont property equals false)
   */
  private onFontDropdownChanged(option: IDropdownOption, index?: number): void {
    this.changeSelectedFont(option.key as string);
  }

  /**
   * @function
   * Renders the datepicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {

    if (this.props.preview === false) {
      //If the user don't want to use the preview font picker,
      //we're building a classical drop down picker
      var dropDownOptions: IDropdownOption[] = [];
      var selectedKey: string;
      this.fonts.map((font: ISafeFont) => {
        var isSelected: boolean = false;
        isSelected = true;
        selectedKey = font.SafeValue;
        dropDownOptions.push(
          {
            key: font.SafeValue,
            text: font.Name,
            isSelected: isSelected
          }
        );
      });
      return (
        <Dropdown label={this.props.label} options={dropDownOptions} selectedKey={selectedKey}
          onChanged={this.onFontDropdownChanged} />
      );
    }
    else {
      //User wants to use the preview font picker, so just build it
      var fontSelect = {
        fontSize: '16px',
        width: '100%',
        position: 'relative',
        display: 'inline-block',
        zoom: '1'
      };
      var dropdownColor = '1px solid #c8c8c8';
      if (this.state.isOpen === true)
        dropdownColor = '1px solid #3091DE';
      else if (this.state.isHoverDropdown === true)
        dropdownColor = '1px solid #767676';
      var fontSelectA = {
        backgroundColor: '#fff',
        borderRadius        : '0px',
        backgroundClip        : 'padding-box',
        border: dropdownColor,
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        position: 'relative',
        height: '26px',
        lineHeight: '26px',
        padding: '0 0 0 8px',
        color: '#444',
        textDecoration: 'none',
        cursor: 'pointer'
      };
      var fontSelectASpan = {
        marginRight: '26px',
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        lineHeight: '1.8',
        textOverflow: 'ellipsis',
        cursor: 'pointer',
        //fontFamily: this.state.safeSelectedFont != null && this.state.safeSelectedFont != '' ? this.state.safeSelectedFont : 'Arial',
        //fontSize: this.state.safeSelectedFont,
        fontWeight: '400'
      };
      var fontSelectADiv = {
        borderRadius        : '0 0px 0px 0',
        backgroundClip        : 'padding-box',
        border: '0px',
        position: 'absolute',
        right: '0',
        top: '0',
        display: 'block',
        height: '100%',
        width: '22px'
      };
      var fontSelectADivB = {
        display: 'block',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        marginTop: '7px'
      };
      var fsDrop = {
        background: '#fff',
        border: '1px solid #aaa',
        borderTop: '0',
        position: 'absolute',
        top: '29px',
        left: '0',
        width: 'calc(100% - 2px)',
        boxShadow: '0 4px 5px rgba(0,0,0,.15)',
        zIndex: '999',
        display: this.state.isOpen ? 'block' : 'none'
      };
      var fsResults = {
        margin: '0 4px 4px 0',
        maxHeight: '190px',
        width: 'calc(100% - 4px)',
        padding: '0 0 0 4px',
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto'
      };
      var carret: string = this.state.isOpen ? 'ms-Icon ms-Icon--caretUp' : 'ms-Icon ms-Icon--caretDown';
      //Renders content
      return (
        <div style={{ marginBottom: '8px'}}>
          <Label>{this.props.label}</Label>
          <div style={fontSelect}>
            <a style={fontSelectA} onClick={this.onOpenDialog}
              onMouseEnter={this.mouseEnterDropDown} onMouseLeave={this.mouseLeaveDropDown}>
              <span style={fontSelectASpan}>
                <i className={'ms-Icon ms-Icon--' + this.state.selectedFont} aria-hidden="true" style={{marginRight:'10px'}}></i>
                {this.state.selectedFont}
              </span>
              <div style={fontSelectADiv}>
                <i style={fontSelectADivB} className={carret}></i>
              </div>
            </a>
            <div style={fsDrop}>
              <ul style={fsResults}>
                {this.fonts.map((font: ISafeFont) => {
                  var backgroundColor: string = 'transparent';
                  if (this.state.selectedFont === font.Name)
                    backgroundColor = '#c7e0f4';
                  else if (this.state.hoverFont === font.Name)
                    backgroundColor = '#eaeaea';
                  var innerStyle = {
                    lineHeight: '80%',
                    padding: '7px 7px 8px',
                    margin: '0',
                    listStyle: 'none',
                    fontSize: '16px',
                    backgroundColor: backgroundColor,
                    cursor: 'pointer'
                  };
                  return (
                    <li value={font.Name} onMouseEnter={this.toggleHover} onClick={this.onClickFont} onMouseLeave={this.toggleHoverLeave} style={innerStyle}>
                      <i className={'ms-Icon ' + font.SafeValue} aria-hidden="true" style={{fontSize: '24px', marginRight:'10px'}}></i>
                      {font.Name}
                    </li>
                  );
                })
                }
              </ul>
            </div>
          </div>
        </div>
      );
    }
  }
}