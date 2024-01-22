<script>
    import { Section } from "flowbite-svelte-blocks";
    import { Label, Input, Button, Select, Textarea, P, Heading, Hr } from "flowbite-svelte";
    import { enhance } from '$app/forms'; 
    export let data;
    export let form;
</script>
    
<Section name="contact">
  <div >
    <Heading tag="h2">Student Mail</Heading>
  </div>
  <div class="grid gap-4 sm:grid-cols-2 sm:gap-2" style="padding-top: 1rem; padding-bottom: 2rem;">
      <Label for="name" >Name: {data.message?.student.name}</Label>
      <Label for="surname" >Surname: {data.message?.student.surname}</Label>
      <Label for="uni_number" >Student number: {data.message?.student.uni_number}</Label>
      <Label for="module_code" >Module code: {data.message?.module_code}</Label>
  </div>
  
  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6" style="padding-bottom: 1rem;">
    <div class="sm:col-span-2">
      <Heading tag="h6" style="padding-bottom: 1rem;">Subject: {data.message?.subject}</Heading>
      <P  whitespace="preline">
        {data.message?.message}
      </P>
    </div>
  </div>
  <form method="POST" action="?/reply" style="padding-top: 1rem; padding-bottom: 1rem;">
    <div class="grid gap-4 sm:grid-cols- sm:gap-4">
        <div class="sm:col-span-2">
        <Textarea id="reply" placeholder="Your response to this message" rows="8" name="reply" required />
        </div>
        <Button type="submit" class="w-32">Send reply</Button>
    </div>
    {#if form?.feedback!=null}
          <Label for="feedback" style="padding-top: 0.5rem; padding-bottom: 0.5rem;">{form.feedback}</Label>
    {/if}
  </form>
</Section>