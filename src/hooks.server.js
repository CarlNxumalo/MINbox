import { PUBLIC_ANON, PUBLIC_URL } from '$env/static/public';
import { createServerClient } from '@supabase/ssr'
import { Student } from './lib/Student';
import { Lecturer } from './lib/lecturer';
import { redirect } from '@sveltejs/kit';
export async function handle({ event, resolve }) {

  console.log("hooks running2...");
  event.locals.supabase = createServerClient(PUBLIC_URL, PUBLIC_ANON, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options)
      },
      remove: (key, options) => {
        event.cookies.delete(key, options)
      },
    },
  })

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  
  event.locals.getSession = async () => {
    const {
      data
    } = await event.locals.supabase.auth.getUser()
    //console.log(data)
    return data
  }

  event.locals.user = async () =>{
    const session = await event.locals.getSession()
    if(!session.user){
      throw redirect(308, '/signin')
    }
    if(session.user.user_metadata.type == 'student'){
      return Student.userObject(session)
    }
    return Lecturer.userObject(session)
  }

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range'
    },
  })
}