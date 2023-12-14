<script>
    import "../app.pcss";
    import {DarkMode,Badge, Heading,Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<div>
    <Navbar style="align-items: center;" >
      <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <Heading tag="h4" class="flex items-center" size="text-5xl">
                MINbox <Badge class="text-lg font-semibold ml-2">Alpha</Badge>
            </Heading>
        </span>
      </NavBrand>
      <NavHamburger />
      <NavUl style="align-items:center;">
        <NavLi href="/">Home</NavLi>
        <NavLi href="/mail">Mail</NavLi>
        <NavLi href="/modules">Modules</NavLi>
        <NavLi href="/lecturer/modules">My modules</NavLi>
        <NavLi href="/profile">Profile</NavLi>
        <DarkMode></DarkMode>
      </NavUl>
    </Navbar>
</div>
<div style="margin-top: 1rem;"></div>

<slot></slot>