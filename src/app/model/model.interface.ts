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
    favs: number;
    weeks: number;
    recipes: number;
    role:number;
}

export interface IUserPage extends IPage<IUser> {
}

//Recipe
export interface IRecipe {
    id_recipe: number;
    id_user: IUser;
    name: string;
    description: string;
    recipe_image: string; //imagen
    content: number;
    favs: number;
    schedules: number;
}

export interface IRecipePage extends IPage<IRecipe> {
}

//Schedule
export interface ISchedule {
    id_schedule: number;
    id_recipe: IRecipe;
    id_weekly: IWeekly;
    type: string;
    day: string;
}

export interface ISchedulePage extends IPage<ISchedule> {
}

//Weekly
export interface IWeekly {
    id_weekly: number;
    id_user: IUser;
    init_date: Date;
    end_date: Date;
    schedules: number;
}

export interface IWeeklyPage extends IPage<IWeekly> {
}

//Ingredient
export interface IIngredient  {
    id_ingredient: number;
   id_type: IType;
   name: string;
   ingredient_image: string; //imagen
   content: number;
}

export interface IIngredientPage extends IPage<IIngredient> {
}

//Type
export interface IType {
    id_type: number;
    name: string;//imagen
    ingredients: number;
}

export interface ITypePage extends IPage<IType> {
}

//Content
export interface IContent {
    id_content: number;
    id_recipe: IRecipe;
    id_ingredient: IIngredient;
}

export interface IContentPage extends IPage<IContent> {
}

//Favourite Recipe
export interface IFavRecipe {
    id_fav: number;
    id_user: IUser;
    id_recipe: IRecipe;
}

export interface IIFavRecipePage extends IPage<IFavRecipe> {
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