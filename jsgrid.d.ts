/**
 *  type definitions for Js-Grid
 *  @see http://js-grid.com/docs
 *  
 */

declare namespace jsGrid {
    type JQueryElement = JQuery<HTMLElement>;



    interface JsGridArgs {
        item: any;
        event: JQueryEventObject;
        itemIndex: number;
    }
    ////#region validation config
    type ValidateConfig = ValidateConfigFunc | ValidateConfigOneParam | ValidateConfigPattern | ValidateConfigRange | ValidateConfigRequired;
    interface ValidateConfigFunc {
        /**
         *  custom validation function
         */
        validator: ((value: any, item?: any, param?: any) => boolean);
        /**
         *   validation message or a function(value, item) returning validation message
         */
        // I guess this is optional
        message?: string | ((value: any, item: any) => string);
        /**
         * a plain object with parameters to be passed to validation function
         */
        //I guess this is optional too
        param?: any;
    }
    interface ValidateConfigRequired {
        /**
         *  built-in validator 
         */
        validator: "required";
        /**
       *   validation message or a function(value, item) returning validation message
       */
        // I guess this is optional
        message?: string | ((value: any, item: any) => string);
    }
    interface ValidateConfigOneParam {
        /**
         *  built-in validator name or custom validation function
         */
        validator: "rangeLength" | "minLength" | "maxLength" | "min" | "max";
        /**
         *   validation message or a function(value, item) returning validation message
         */
        // I guess this is optional
        message?: string | ((value: any, item: any) => string);
        /**
         * a plain object with parameters to be passed to validation function
         */
        param: number;
    }
    interface ValidateConfigRange {
        /**
         *  built-in validator name or custom validation function
         */
        validator: "range";
        /**
         *   validation message or a function(value, item) returning validation message
         */
        // I guess this is optional
        message?: string | ((value: any, item: any) => string);
        /**
         * a plain object with parameters to be passed to validation function
         */
        param: [number, number];
    }
    interface ValidateConfigPattern {
        /**
         *  built-in validator name or custom validation function
         */
        validator: "pattern";
        /**
         *   validation message or a function(value, item) returning validation message
         */
        // I guess this is optional
        message?: string | ((value: any, item: any) => string);
        /**
         * a plain object with parameters to be passed to validation function
         */
        param: RegExp;
    }
    //#endregion
    interface JsGridField {
        type: ("text" | "number" | "checkbox" | "select" | "textarea" | "control"),
        name: string,
        title: string,
        align: ("left" | "center" | "right"),
        width: string | number | ((this: Node, index: number, height: number) => string | number),
        visible: boolean,

        css: string,
        headercss: string,
        filtercss: string,
        insertcss: string,
        editcss: string,

        filtering: boolean,
        inserting: boolean,
        editing: boolean,
        sorting: boolean,
        sorter: boolean,

        headerTemplate: () => string | Node | JQueryElement,
        itemTemplate: (value: any, item: any) => string | Node | JQueryElement,
        filterTemplate: () => string | Node | JQueryElement,
        insertTemplate: () => string | Node | JQueryElement,
        editTemplate: (value: any, item: any) => string | Node | JQueryElement,

        filterValue: () => any,
        insertValue: () => any,
        editValue: () => any,

        cellRenderer: (value: any, item: any) => string | Node | JQueryElement,

        validate: "required" | ((value: any, item: any, param?: any) => boolean) | ValidateConfig |
        ("required" | ((value: any, item: any, param?: any) => boolean) | ValidateConfig)[];
    }

    interface JsGridConf {
        fields: JsGridArgs[],
        data: any[],

        autoload: boolean,
        controller: {
            loadData: (filter: any) => Promise<any>,
            insertItem: (item: any) => Promise<any>,
            updateItem: (itemOrRow: any | Node | JQuery<Node>, editedItem: any) => Promise<any>,
            deleteItem: (item: any) => Promise<any>
        },

        width: string | number | ((this: Node, index: number, value: number) => string | number),
        height: string | number | ((this: Node, index: number, height: number) => string | number),

        /**
         * A boolean value specifies whether to show grid header or not.
         */
        heading: boolean,
        /**
         * A boolean value specifies whether to show filter row or not.
         */
        filtering: boolean,
        /**
         * A boolean value specifies whether to show inserting row or not.
         */
        inserting: boolean,
        editing: boolean,
        selecting: boolean,
        sorting: boolean,
        paging: boolean,
        pageLoading: boolean,

        rowClass: (item: any, itemIndex: number) => string,
        rowClick: (args: JsGridArgs) => any,
        rowDoubleClick: (args: JsGridArgs) => any,

        noDataContent: string,

        confirmDeleting: boolean,
        deleteConfirm: string,

        pagerContainer: null,
        pageIndex: number,
        pageSize: number,
        pageButtonCount: number,
        pagerFormat: string,
        pagePrevText: string,
        pageNextText: string,
        pageFirstText: string,
        pageLastText: string,
        pageNavigatorNextText: string,
        pageNavigatorPrevText: string,

        invalidNotify: (args: JsGridArgs) => any,
        invalidMessage: string,

        loadIndication: boolean,
        loadIndicationDelay: number,
        loadMessage: string,
        loadShading: boolean,

        updateOnResize: boolean,

        rowRenderer: null | Function,
        headerRowRenderer: null | Function,
        filterRowRenderer: null | Function,
        insertRowRenderer: null | Function,
        editRowRenderer: null | Function,
        /**before controller.loadData
         */
        onDataLoading: (args: JsGridArgs) => void,
        /**on done of controller.loadData
         */
        onDataLoaded: (args: JsGridArgs) => void,

        /**on fail of any controller call
         */
        onError: (args: JsGridArgs) => void,
        /**after grid initialization 
         */
        onInit: (args: JsGridArgs) => void,

        /**before controller.insertItem
         */
        onItemInserting: (args: JsGridArgs) => void,
        /**on done of controller.insertItem
         */
        onItemInserted: (args: JsGridArgs) => void,
        /**before controller.updateItem
         */
        onItemUpdating: (args: JsGridArgs) => void,
        /**on done of controller.updateItem
         */
        onItemUpdated: (args: JsGridArgs) => void,
        /**before controller.deleteItem
         */
        onItemDeleting: (args: JsGridArgs) => void,
        /**on done of controller.deleteItem
         */
        onItemDeleted: (args: JsGridArgs) => void,
        /**after item validation, in case data is invalid
         */
        onItemInvalid: (args: JsGridArgs) => void,

        /**before changing the grid option
         */
        onOptionChanging: (args: JsGridArgs) => void,
        /**after changing the grid option
         */
        onOptionChanged: (args: JsGridArgs) => void,

        /**after changing the current page    
         */
        onPageChanged: (args: JsGridArgs) => void,

        /**before grid refresh
         */
        onRefreshing: (args: JsGridArgs) => void,
        /**after grid refresh
         */
        onRefreshed: (args: JsGridArgs) => void,
    }

    interface JsGridSortConfig { field: number | string | JsGridField, order: "asc" | "desc" | null }

}
interface JQuery<TElement extends Node = HTMLElement> {
    jsGrid(conf: Partial<jsGrid.JsGridConf>): void;
    jsGrid(cmd: "cancelEdit" | "destroy" | "clearInsert" | "refresh" | "reset" | "showPrevPages" | "showNextPages"): void;
    jsGrid(cmd: "clearFilter" | "render"): Promise<any>;
    jsGrid(cmd: "getFilter" | "getSorting"): Object;
    jsGrid(cmd: "fieldOption", fieldNameOrIndex: string | number, optionName: string, optionValue: any): void;
    jsGrid(cmd: "fieldOption", fieldNameOrIndex: string | number, optionName: string): any;

    jsGrid(cmd: "editItem", itemOrRow: string | Node | jsGrid.JQueryElement): void;
    jsGrid(cmd: "deleteItem", itemOrRow: string | Node | jsGrid.JQueryElement): Promise<any>;
    jsGrid(cmd: "insertItem" | "loadData" | "search", item: any): Promise<any>;
    jsGrid(cmd: "rowByItem", item: any): jsGrid.JQueryElement;
    jsGrid(cmd: "sort", confOrField: jsGrid.JsGridSortConfig | jsGrid.JsGridField, order?: "asc" | "desc"): Promise<any>;
    jsGrid(cmd: "openPage", pageIndex: number): void;
    jsGrid(cmd: "option", optionName: string, optionValue: string): void;
    jsGrid(cmd: "option", optionName: string): string;
    jsGrid(cmd: "updateItem", itemOrRow?: any, editedItem?: any): Promise<any>;

    jsGrid(arg1: string, arg2: string | Node | jsGrid.JQueryElement | number | any): Promise<any> | void | Object;
    jsGrid(obj: any): void;

}

interface jsGrid {
    locale(l: string | any): void;
    setDefaults(conf: Partial<jsGrid.JsGridConf>): void;
    setDefaults(fieldName: string, conf: any): void;
    /**
     * Current locale can be set for all grids on the page with the 
     * jsGrid.locale(localeName)  method.
     * New custom locale can be added to jsGrid.locales hash like the following:
     * <pre>
     * <code>
     * jsGrid.locales.my_lang = {
     *  // localization config goes here
     *  ...
     *  };
     *  }
     * </code>
     * </pre>   
     */
    locales: any;
    readonly sortStrategies: any;
}