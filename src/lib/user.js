import { supabase } from '$lib/supabaseClient.js';

export async function signUp(name, surname, student_number, email, password, type){
    const { data, error } = await supabase.auth.signUp(
        {
            email: email,
            password: password
        }
    )
    console.log(data);
    console.log(error);

    
    if(data){
        const { error } = await supabase
        .from('Users')
        .insert({ id: data.user.id, name: name, surname: surname, student_number: student_number, email: email, lecturer: type })
    }
    
    
}
export function userType(){
    
}
export async function sendMessage(user_id, module_id, subject, body, type){
    const { error } = await supabase
        .from('Messages')
        .insert({ module_id: module_id, student_id: user_id, subject: subject, body: body, private: type })
}
export function seeMessages(){
    
}
export function joinModule(){
    
}
export function removeModule(){
    
}