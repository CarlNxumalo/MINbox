import { redirect } from '@sveltejs/kit';
import { Student } from '../../lib/Student.js';
import { Lecturer } from '../../lib/lecturer.js';
import { scores } from '../../lib/Similarity.js';
//method 

//this is the page a user will see their mail
//we first get the user id if the session is there
// then return their data
//if no session we redirect them to sign in

export async function load({ locals:{user}, params, cookies }) {
    const User = await user()
    //console.log(User)
    try {
        if(User instanceof Student)
        {
            var mods = await User.myModules()
            mods.push({ value: 0, name: 'All Modules' })
            return {
                modules: mods,
                messages: await User.showMessages(),
                selectedModule: undefined
            }
        }        
    } catch (error) {
        return {
            modules: [],
            messages: []
        }
    }

    if(User instanceof Lecturer){
        throw redirect(303, '/lecturer'); 
    }
    throw redirect(303, '/signin'); 

}

export const actions = {
    /*
	default: async ({ request, locals: { user } }) => {
        const formData = await request.formData();
        var module_id = formData.get('module');
        var subject = formData.get('subject');
        var body = formData.get('body');
        const type = (formData.get('private')=='on') ? true:false;
        const User = await user()
        if(User instanceof Student){
            await User.sendMessage(module_id, subject, body, type)
        }

        return {
            success: "Sent email"
        }
	}
    */
    ByModule: async ({ request, locals: { user } }) => {
        try {
            const formData = await request.formData();
            var module_id =parseInt(formData.get('module'),10);
            console.log(module_id)
            const User = await user();
            if(User instanceof Student){
                if(module_id === 0){
                    return {
                        messages: await User.showMessages(),
                        selectedModule: module_id
                    }
                }
                return {
                    messages: await User.showMessagesByModule(module_id),
                    selectedModule: module_id
                }
            }
        } catch (error) {
            return {
                messages: []
            }
        }
    },
    
    AISearch: async ({ request, locals: { user } }) => {
        try {
            //get search text
            const User = await user();
            const formData = await request.formData();
            var searchText = formData.get('search');
            var module_id =parseInt(formData.get('module'),10);
            //get messages
            var messages;
            if(module_id === 0 || isNaN(module_id)){
                messages =  await User.showMessages()
            }
            else{
                messages = await User.showMessagesByModule(module_id)
            }
            //console.log(module_id)
            let sentences = messages.map(item => item.message);
            //put into huggingface API
            let Scores = await scores({'inputs': {
                'source_sentence': searchText,
                'sentences': sentences
            }});
            if(Scores.error){
                return {
                    error: Scores.error,
                    selectedModule: isNaN(module_id) ? undefined:module_id,
                    messages: messages
                }
            }
            //map to new outMessages list
            messages.forEach((obj, i) => {
                obj.score = Scores[i];  // Add a new property to each object
            });
            //sort
            messages.sort((a, b) => b.score - a.score);
            //console.log(messages)

            return {
                messages: messages,
                selectedModule: isNaN(module_id) ? undefined:module_id,
                search: searchText
            } 
        } catch (error) {
            console.log("AI search: "+error);
        }

    }
};


