

const saveBoards = async (problemid : Number,problem_title : String,email : String,board : String) => {

    try{
            const response = await fetch("/api/saveboard",{
                method: "POST",
                headers : {"Content-Type": "application/json"},
                body: JSON.stringify({problemid : problemid,problem_title : problem_title,email : email,board : board})
            });
        return await response.json();
    }
    catch(err){
        return Promise.reject(err);
    }
};

export default saveBoards;