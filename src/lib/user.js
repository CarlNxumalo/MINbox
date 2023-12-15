import { supabase } from '$lib/supabaseClient.js';

export async function signUp(name, surname, student_number, email, password, type){
    const { data, error } = await supabase.auth.signUp(
        {
            email: email,
            password: password
            //add type
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

export async function sendMessage(user_id, module_id, subject, body, type){
    const { error } = await supabase
        .from('Messages')
        .insert({ module_id: module_id, student_id: user_id, subject: subject, body: body, private: type })
}
export async function getModules(user_id){
    const { data, error } = await supabase
    .from('Modules')
    .select('module_id, module_code, StudentModules!inner()')
    .eq('StudentModules.student_id', user_id);
    const formattedData = data.map(item => ({
        value: item.module_id,
        name: item.module_code
    }));
    //console.log(formattedData);
    return formattedData;
}
export async function studentMessages(user){
    const { data, error } = await supabase.rpc('modulemessages', { userid: user});
    let mods= await getModules(user)
    return {
        messages: data,
        modules: mods,
    }
}
export function joinModule(){
    
}
export function removeModule(){
    
}