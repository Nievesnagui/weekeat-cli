import { HttpErrorResponse } from "@angular/common/http";

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}


//User 
export interface IUser{
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    profile_picture: string; //imagen
    favs: Array<IFavRecipe>;
    weeks: Array<IWeekly>;
    recipes: Array<IRecipe>;
    role:number;
}

export interface IUserPage extends IPage<IUser> {
}

//Recipe
export interface IRecipe {
    id: number;
    id_user: IUser |null;
    name: string;
    description: string;
    recipe_image: string; //imagen
    process: string;
    content: Array<IContent> ;
    favs: Array<IFavRecipe> ;
    schedules: Array<ISchedulePrueba> ;
}

export interface IRecipePage extends IPage<IRecipe> {
}

//Schedule
export interface ISchedule {
    id: number;
    id_recipe: IRecipe;
    id_weekly: IWeekly;
    type: string;
    day: string;
}

export interface ISchedulePrueba {
    id: number;
    recipe: IRecipe;
    weekly: IWeekly;
    type: string;
    day: string;
}

export interface ISchedulePagePrueba extends IPage<ISchedulePrueba> {
}

export interface ISchedulePage extends IPage<ISchedule> {
}

//Weekly
export interface IWeekly {
    id: number;
    id_user: IUser;
    init_date: Date;
    schedulesList: number;
}

export interface IWeeklyPage extends IPage<IWeekly> {
}

//Ingredient
export interface IIngredient  {
    id: number;
   id_type: IType | null;
   name: string ;
   ingredient_image: string; //imagen
   content: number | null;
   isInContent: boolean;
}

export interface IIngredientPage extends IPage<IIngredient> {
}

//Type
export interface IType {
    id: number;
    name: string;
    ingredients: number;
}

export interface ITypePage extends IPage<IType> {
}

//Content
export interface IContent {
    id: number;
    id_recipe: IRecipe;
    id_ingredient: IIngredient;
}

export interface IContentPrueba {
    id: number;
    ingredient: IIngredient;
    recipe: IRecipe;
}

export interface IContentPruebaPage extends IPage<IContentPrueba> {
}

export interface IContentPage extends IPage<IContent> {
}

//Favourite Recipe
export interface IFavRecipe {
    id: number;
    id_user: IUser;
    id_recipe: IRecipe;
}

export interface IIFavRecipePage extends IPage<IFavRecipe> {
}

export interface IFavRecipePrueba {
    id: number;
    user: IUser;
    recipe: IRecipe;
}

export interface IIFavRecipePagePrueba extends IPage<IFavRecipePrueba> {
}

//Otras cosas
export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}

export interface ICaptcha{
    id: number,
    text: string,
    image: string
}

export interface IPrelogin {
    id: number,
    token: string,
    captchaImage: string
}

export class Language {
    constructor(
        public code: string,
        public name: string,
        public resource: string
    ) { }
}