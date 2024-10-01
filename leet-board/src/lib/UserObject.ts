
interface Board{
    problem_id : string;
    problem_title : string;
    version : Object;
};

export default interface UserObject {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    boards : Array<Board>;
};