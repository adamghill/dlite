# FAQ

## How big is `dlite`?

`dlite` is **~3.5kB** when gzipped.

## Why yet another JavaScript library?

Why not?! 😉

_A real answer from the original author of `Litedom`:_

[Mardix is] an UI Tech Lead Application Engineer at Bank of America, who deals with many static sites, and see how stuff can sometimes be frustrating for team members when it come to choices. 

So, one week-end afternoon (4/20 weekend 2019 :), while working on a personal project using a static site generator, I thought it was way too much of an overhead to bring in something like Vue, React or Angular, just to make a small piece reactive on the personal static site. 

So [Mardix] decided to create Litedom, to just be a simple drop-in view library that can make any sections of the site reactive without the overhead. [Mardix] wanted... HTML to stay as is. No React, no Vue, just... HTML and me.

## Does it replace React, Vue etc?

Not really. `dlite` is targeting a different set of applications, small web apps or static sites. Some times you just want a little bit of reactivity without including a huge library. It follows the same paradigms as Vue.js, just on a much smaller scale.

## Isn't the DOM slow?

No, the DOM is ridiculously fast.

[The DOM isn't slow, you are](https://korynunn.wordpress.com/2013/03/19/the-dom-isnt-slow-you-are/) goes into more depth, although skip it if you do not want to read some spicy takes.

`dlite` uses `emerj` to modify the DOM and it has a section about performance in [Emerj.js: efficient HTML UI in 60 lines](https://blog.brush.co.nz/2017/11/emerj-js-efficient-html-ui-in-60-lines).

## Does size _really_ matter?

For JavaScript libraries, yes. The less JavaScript to download and parse, the faster your site will render. Ipso facto, your users will be happier and the world will be a better place.

## Who created this?

[Mardix](https://github.com/mardix) created [Litedom](https://github.com/mardix/litedom) although it hasn't been updated since 2019. [adamghill](https://github.com/adamghill) tried it out in 2023 and was so impressed by the approach he wanted to improve it. He decided to hard fork it, fix bugs, update the code, re-write the docs, and re-brand the library so that it can get more ❤️.