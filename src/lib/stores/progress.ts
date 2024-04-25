import { tweened } from "svelte/motion";
import { cubicOut } from 'svelte/easing';
import { writable } from "svelte/store";

export const progress = tweened(0, {
    duration: 400,
    easing: cubicOut
});

export const userClicked = writable(false);