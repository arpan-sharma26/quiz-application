import { FormControl, InputLabel, Select, MenuItem, Grid, Box, Dialog, DialogTitle, DialogContent, CircularProgress, Typography, TextField, FormHelperText, Button, DialogActions } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { actions } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const QuizResult = () => {

    const dispatch = useDispatch();

    let disableDropdown = false;

    const moneyBlocks = useSelector(state => state.moneyBlocks);
    const [ifDialogOpen, setIfDialogOpen] = useState(true);
    const [ifRevealBlockOpen, setIfRevealBlockOpen] = useState(false);
    const [userBookViewModal, setUserBookViewModal] = useState(false);
    const totalValues = useSelector(state => state.totalValues);
    const [email, setEmail] = useState("");

    useEffect(() => {
        window.setTimeout(() => {
            setIfDialogOpen(false);
        }, 5000);
        dispatch(actions.averageCalculations());
    }, [dispatch]);

    const highestValue = totalValues.reduce((a, b) => { return Math.max(a, b) });

    let numberOfInstances = 0;
    let filteredMoneyBlocks = [];

    let [dropdownValue, setDropdownValue] = useState("0");
    let [spouseDropdownValue, setSpouseDropdownValue] = useState("");

    let [selfDescription, setSelfDescription] = useState("");
    let [spouseDescription, setSpouseDescription] = useState("");

    let blocksDescription = [{
        "The Procrastination Block-The Lack Block": [
            `Vitale Hardin of the Hardin Group brilliantly talks about how procrastination is a form of perfectionism.`,
            `When it comes to money, this is true so much of the time.`,
            `Whether we want to do things right or we’re overwhelmed by the number of things we have to do, procrastination allows us to have some sort of control.`,
            `A partner with a lack block feels as though they are never in control, so it’s interesting that you may be using procrastination to control things when there is actually nothing to control.`,
            `Because there are so many things competing for your money, whether it be advertisers, other people, obligations, debts, or anything at all, you can see how quickly indecision will creep up and allow you to avoid things that need handling in order to grow your wealth.`
        ],
        "The Procrastination Block-The Spend Block": [
            `If one of the main ways procrastination manifests in your life is through control, then you might be trying to control a situation where it feels as though your partner is out of control.`,
            `Now, even if your partner doesn’t have a reckless spending problem and all they do is simply mishandle money that comes into your life by, for instance, immediately paying bills with it, they also might be trying to stay in control of a situation that feels reckless.`,
            `It's going to be necessary for you to come up with a prioritization plan and compared to all the couples and combinations of blocks, you may need to automate your finances (if you both have steady incomes) to ensure that it goes where needed before you can get your hands on it.`
        ],
        "The Procrastination Block-The Worthiness Block": [
            `This relationship may feel sensitive at times because you may struggle to ask for help from your partner when you need it.`,
            `Worse yet, you may not even recognize when you need help.`,
            `It might feel as though the pressure to solve the financial problems in your partnership lie solely with you.`,
            `You may have noticed that when you are able to complete tasks or handle things quickly and efficiently, your partner feels excited and hopeful.`,
            `However, know that your struggle doesn’t mean you love your partner any less and that you are trying to disappoint them.`,
            `This relationship is going to require both partners to participate in and work together on handling both income/expenses and assets/liabilities.`,
            `While some couples can get away with one partner handling the bulk of the finances, here you both need to be rowing the boat so that you don’t go in circles.`
        ],
        "The Procrastination Block-The Intelligence and Skill Block": [
            `This is where a relationship can get caught in research hell.`,
            `There’s a lot of talk and thinking about doing things, but not a lot of things are actually getting done, and this can feel frustrating to both parties.`,
            `Be careful not to blame your partner and be very aware of how you contribute to this cycle.`,
            `If overthinking has been your pattern in the past, you will have to work on taking small action steps to increase the level of confidence and the level of accountability in your relationship.`
        ],
        "The Procrastination Block-The Hard Work Block": [
            `If you struggle to get started on things and your partner feels as though they are the one doing all the work, then this is a hard dynamic to reconcile.`,
            `Even though you are partners, it might not always feel like it.`,
            `Your partner may be doing a lot of work that can be seen, and it might feel to you as though you are doing a lot of emotional work, or the work that can’t be seen.`,
            `In this relationship, sarcasm equals death.`,
            `You may have to work hard to overcome feelings of bitterness or other flavors that slowly poison a relationship.`,
            `Open but kind and honest communication, coupled with empathy, is a necessary daily event if this relationship is to heal properly.`
        ],
        "The Procrastination Block-The Stress Block": [
            `In this relationship, you might easily trigger each other because if you’re overwhelmed or feel as though you have the inability to get things done, this can cause your partner to feel more stressed about money.`,
            `It’s going to be very difficult to have calm, level-headed discussions because one of the challenges of being in a relationship with a procrastinator is that their intentions are often pure but don’t always line up with their actions, and this can unfortunately breed mistrust.`,
            `One of the greatest gifts you can give your partner is that of underpromising and overdelivering, and of being graceful and lighthearted when you fail.`,
            `Overcoming procrastination has less to do with finishing things and more to do with improving your relationship with failure.`,
            `You’re going to have to lead by example with grace here.`
        ],
        "The Procrastination Block-The Procrastination Block": [
            `Relationships where both partners have procrastination blocks and heal them together become unstoppable.`,
            `It is challenging to manage these relationships, however, when nobody is willing to go first.`,
            `So, because you are the one whose eyeballs are hitting this page, I highly encourage you to be the one to take the first step when it comes to money.`,
            `Be willing to talk about it, take action with it, and overcome the block.`,
            `You’re already killing this leadership thing because you are reading this book, so high five to you!`,
            `Your financial future will be painful if you enable each other to procrastinate, so be the brave one.`,
            `Otherwise, you will be that old couple who looks back and says, “If only we would have…”`
        ],
        "The Procrastination Block-The Money Guilt Block": [
            `What’s really funky about this combination is that procrastination often comes with a lot of guilt (you have a lot of guilt for not earning more income or managing your finances better), and your partner also has a lot of guilt, although for not helping other people more.`,
            `(And if either of you is a practicing Catholic, this is a triple-scoop sundae with guilt sauce.)`,
            `The anxiety your partner feels about the state of the world may spill into the anxiety you have about which financial decisions to make next.`,
            `You’re going to have to be very clear about what your inventory is and what your partner’s internal inventory is, and you’re going to have to do everything in your power not to take your partner’s.`,
            `(Inventory meaning: what you are responsible for.) This relationship needs extra patience and grace, and, thankfully, you are two people who are naturally good at giving those things outside of the relationship.`,
            `We just need to redirect it.`
        ],

        "The Lack Block-The Lack Block": [
            `It’s highly likely you will feel like you just scrape by.`,
            `You will be more focused on expenses than on growth and expansion of income.`,
            `Money stress is high in this relationship.`,
            `You are likely living paycheck to paycheck.`,
            `You may also experience something called “chronic dissatisfaction,” which might show up as the feeling of “wanting more,” but without being clear on what “more” actually is.`,
            `You might also struggle to accept any emotion that isn’t happiness, and, when you feel emotions that aren’t pleasant, you might choose to assume those emotions mean you are doing something wrong.`,
            `You might be harsh on yourself or with the other because of high expectations that chronically go unmet.`,
            `You might feel anxious when you or your partner isn’t productive.`,
            `You might live in a state where you believe things will be better/easier/happier once you hit your goals, but you aren’t sure when that will ever happen because you can’t seem to hit them.`,
            `And you might feel a sense of constant frustration or agitation when it comes to finances.`,
            `You can see how this would create a sense of unease in a relationship!`,
            `Sometimes in this partnership, if one partner starts to make strides in an area of their life, the other partner will unconsciously sabotage the progress.`,
            `There also might be lots of talk in the relationship about what you don’t have, and a greater focus on the struggles rather than the successes.`,
            `Gratitude won’t come easily, or it will likely be short lived.`,
            `When you look at other couples who appear wealthy or successful, you cannot fathom how they did it, and they might appear “lucky” to you.`,
            `You may also find that you shoot down ideas or help from others and that you seem unconsciously committed to being stuck.`
        ],

        "The Lack Block-The Spend Block": [
            `Your relationship requires massive communication, immediately.`,
            `You are likely highly stressed and feel that you need to have one hand on the emergency brake at all times while your partner drives the finances out of control.`,
            `You might wonder, “Are we ever going to get out of this mess?” or, “Will we ever retire?”, and you might choose to avoid money conversations entirely because they lead to fights.`,
            `There will likely be high blame placed on the partner who has the spend block, though both partners contribute to the difficulty.`,
            `You may need to lead conversations because the spender may have guilty feelings associated with their behaviors, especially if they feel unable to stop them.`,
            `You may not be a controlling person in other areas of your life, but sometimes you may feel the need to control your partner’s spending for fear you will run out of funds. 
            This likely feels very uncomfortable for you!`,
            `You might feel embarrassed of your partner at times.`,
            `You might also feel as though you are apologizing for their decisions or behaviors.`,
            `You might notice that your partner has to justify their spending to you, or that there seems to be a financial power differential in your relationship.`,
            `You both might find it is very difficult to keep promises to yourselves, yet you might both be great at keeping promises to others.`
        ],

        "The Lack Block-The Worthiness Block": [
            `It’s likely that your two major blocks are feeding off each other. Your partner gets to reinforce that they are “right” and not worthy when they are reminded of the lack, and their struggle to feel worthy will reinforce that there just is not enough.`,
            `This is a dangerous combo when it comes to self-esteem.`,
            `Because the two of you are also highly likely to put other people first, the relationship can start off feeling very caring as you’ll put each other first.`,
            `However, over time, we can see how this could lead to codependency, where one partner’s emotions become the other partner’s responsibility.`,
            `This is a very unhealthy emotional dynamic and will not be a long-term strategy for financial success.`,
            `Eventually, you may put other people’s money needs ahead of what you need financially as a couple, and this kind of entanglement becomes very costly in the long run.`,
            `This is the ultimate combo that creates debt.`,
            `You likely have carried a credit card balance or debt balance throughout your life.`,
            `You might have previously tried consolidation loans or other quick fixes in moments of desperation.`,
            `You may also often avoid salespeople because you feel you are easily “sold,” that you can’t say no.`
        ],

        "The Lack Block-The Intelligence and Skill Block": [
            `If you are worried about never having enough and your partner is worried about not being good or smart enough, the not-enough-ness will be the prevailing theme in the relationship.`,
            `In order to find belonging, it’s likely that your partner’s friend circle will be full of people who also are perceived as lacking in skills or education.`,
            `Your partner may feel inadequate hanging around intelligent people, or, if there is ego at play, your partner may even claim disdain or dislike for people who are financially free.`,
            `Growth and progress will be greatly hindered in this relationship, and this pattern not only will show up via poor financial results but it may also be affecting other areas of your relationship as well.`,
            `You might notice you frequently enable each other.`,
            `This means you might be trying to protect your loved ones from experiencing the full consequences of their behavior because of your own personal fears.`,
            `You may also be indirectly supporting your partner’s harmful behavior.`,
            `Remember that harmful behavior might not simply refer to activities that are harmful; sometimes we harm the people we love by limiting them or by not allowing them to grow to their full potential.`
        ],

        "The Lack Block-The Hard Work Block": [
            `When you are living in a lack mentality and your partner believes that in order to be successful, you have to work really hard, the relationship could be strained because your partner is never home and, instead, is always working.`,
            `This may feel like a lack of love. Workaholism could develop.`,
            `There will be emotional strain on the relationship because there will never be enough quality or intimate time spent together when one person is always thinking about work or the lack of money.`,
            `The other theme that tends to crop up in this combination is that you may feel blamed for some of the financial struggle because, as the other partner is working hard.`,
            `It might be wrongly assumed that it can’t possibly be their fault.`,
            `Your partner might be burned out and possibly resentful, even though you aren’t making them work hard or long.`,
            `You might even increase your nonessential spending out of boredom or loneliness.`,
            `You might have a lot of imaginary dangling carrots, such as the belief that “when we get to this goal…then everything will be easier,” even though that goal never comes.`
        ],

        "The Lack Block-The Stress Block": [
            `If you are struggling with lack and your partner believes that more money is going to cause more problems and that money equals stress, then you will both live in a constant state of stress.`,
            `You might find that you want to avoid dealing with finances to avoid the stress, so you might have unopened bills.`,
            `You might also be pretending things are better than they are because you want so badly for that to be true.`,
            `The relationship will always be strained because the lack itself causes stress, but the strain increases when one partner avoids stress by avoiding money; this will obviously repel money and reinforce the lack belief system.`,
            `This is a doozy! Because you are a caring person who loves your partner and wants what is best for them (and hates to see them stressed), you might be overcompensating in trying to take the pressures away, but all that happens is a little stress transference, where you start to take on all the work and, subsequently, all the stress.`,
            `This relationship may be riding the emotional roller coaster at Resentmentland, so make sure you have saltines on hand when you do the budget so that you don’t get nauseous!`
        ],

        "The Lack Block-The Money Guilt Block": [
            `If you feel as though there’s never enough and if your partner is always worried about other people not having enough, and if anytime you do get money your partner feels (consciously or unconsciously) the need to get rid of the money or give it away in order to alleviate the guilt or feeling…(*deep breath*)…it’s going to be really difficult to ever experience abundance in this relationship unless both people work on their belief systems.`,
            `While you feel financial uncertainty, your partner may be creating financial uncertainty in the name of doing the right thing.`,
            `The trouble is that sometimes what is the “right thing” publicly is the “wrong thing” personally because we need to be in a proper state of abundance to truly care for others.`,
            `One of your challenges will be to not take on your partner’s financial worries as your own, because your partner is already worrying about a heck of a lot of things.`,
            `In this scenario, both spouses are going to have to commit to working on the inside of the relationship first before trying to help anyone on the outside of it.`,
            `Setting small goals here that are easy to manage and building financial trust in each other will both help and intrinsically motivate you to do more so that you can give more.`
        ],

        "The Lack Block-The Procrastination Block": [
            `If you are struggling with lack and your partner’s main block is procrastination, then, even if you are aligned on the need to talk about and work on money, it’s going to be so much harder because procrastination is very demotivating.`,
            `The longer it takes you to do something, the longer you may lose belief in yourself.`,
            `If your partner has been a procrastinator for a long time and is also plagued with self-doubt, sometimes the solution is simply to break tasks up into smaller pieces and build confidence through consistent competence.`,
            `However, because you have a lack mentality (you don’t believe there will ever be enough), this actually enables the procrastination, putting you and your partner in an endless loop—like that “Baby Shark” song.`,
            `Your partner requires extra compassion because their block may be part of a bigger issue, such as attention deficit or depression, as procrastination is often a by-product of something more serious.`,
            `You might be tempted to nag, prod, or incentivize your partner to get them to take action, but you might also already know that doesn’t work.`,
            `Be careful not to blame your partner’s procrastination for the position you are in because it can be tempting to say, “If only they did _______, then our problems would go away,” but we know that Blame Town only has a population of one.`
        ],

        "The Spend Block-The Lack Block": [
            `You may feel controlled in this relationship when it comes to spending.`,
            `Even if your partner doesn’t explicitly say that you spend too much (because they feel as though there is never enough money), you may feel that you do in comparison.`,
            `You may want to experience a bit more freedom when it comes to money, but your partner might be so worried that they are always trying to rein in your spending.`,
            `(Please note: if control over you is showing up in other areas of your life, too, you are likely experiencing financial/emotional/mental abuse. This is very different than one partner preferring to restrict spending for the benefit of the relationship.)`,
            `Spenders, you get blamed for much of the stress in the relationship, but it’s not entirely your fault, so know that you are an easy scapegoat, but you are not the cause.`,
            `You’re going to primarily work on keeping that net-worth spreadsheet updated.`,
            `It can be helpful in this scenario to learn about investing together because often when we can flip a spender from an interest in buying consumer goods to an interest in buying investments, the entire team will benefit.`,
            `Watching your net-worth increase week after week will be motivating and will compound all the inner work you do, as well as the dollars.`
        ],

        "The Spend Block-The Spend Block": [
            `The main issues here will involve justification of spending.`,
            `If you feel as though your partner doesn’t spend wisely and they believe you don’t spend wisely, it could mean your finances have turned into a game with a scoreboard.`,
            `But when we keep score in a relationship, there is never a winner.`,
            `Wealth may be difficult to accumulate in this relationship because there will often be more urgent things to spend money on, and, while wealth building is important, it doesn’t always feel urgent (until you are ninety-nine and being spoon-fed either tuna fish or cat food, hard to tell which).`,
            `When everyone is spendy, it’s going to require some self-discipline to focus on your own spending instead of comparing it to the wallet next to yours.`,
            `This is a relationship that is going to require you to stay in your own lane because your partner cannot drive you crazy unless you hand them the keys.`
        ],

        "The Spend Block-The Worthiness Block": [
            `If you struggle to keep money in your realm and your partner feels a general lack of worthiness, sometimes you both start to equate your net worth with your actual worth.`,
            `These are very different things and should not be used to determine value.`,
            `Sometimes the spender (depending on their love language) can end up spending in order to make the other person feel worthy, but that is a fruitless effort.`,
            `Sometimes because there is no money the person who feels unworthy ends up blowing funds because they may unconsciously think, “What difference does it make? My partner overspends anyway.”`,
            `We hit bumpy relationship territory when you—our fearless spender—keep trying to solve the internal problems of the relationship with external resources that cost money.`,
            `Your primary work will involve connection.`,
            `Because of the frenetic energy that buzzes between the two of you, stillness is the key.`,
            `Watch your screen time, you two. Spending time in nature, reading, slowing down, and journaling will be key to your financial transformation.`
        ],

        "The Spend Block-The Intelligence and Skill Block": [
            `If you are a spender and your partner doesn’t feel smart enough, sometimes you end up overcompensating for your partner’s lack of belief in themselves.`,
            `For example, if you are not able to keep money, and your partner does not feel as though they can get ahead because they’re too dumb or don’t have the right skills, you might end up with a lot of student-loan debt while your partner keeps taking course after course trying to get ahead, yet not actually putting things into practice.`,
            `This occurs because they never feel as though they actually know enough to make anything positive or productive happen; they don’t understand that tiny actions are building blocks that will support all the learning they’re doing in personal development.`,
            `This combination sometimes turns a couple into personal-development or academic junkies, where it can be easy to justify the expense because it’s an “investment in yourself,” even though that investment isn’t generating any tangible return.`
        ],

        "The Spend Block-The Hard Work Block": [
            `This one is tricky because, in this relationship, many fingers can be pointed at each other—while one person is spending, the other is trying to outearn the spending, and this creates a lot of resentment and worries.`,
            `While it isn’t actually true that the spender is causing the partner to work more hours, it can easily seem this way if we’re looking at it logistically instead of spiritually.`,
            `From a spiritual perspective, we know that the person who wants to work hard would do that anyway because of their own beliefs about money, but it’s easy to blame the spender in this circumstance, so you might feel as though you were always at fault.`,
            `It’s important to note that your hardworking partner is contributing equally to the challenge in the relationship because one person is never entirely to blame in a two-person pattern.`,
            `Regardless, you need to focus on healing your spend block so that you can feel above reproach and know in your heart that everyone in the relationship is entitled to their own experience of it.`
        ],

        "The Spend Block-The Stress Block": [
            `In this situation, if you have a partner that always seems stressed about money or seems to want to repel money, and if you are constantly getting rid of money, the relationship will likely be tense.`,
            `Sometimes, you won’t realize until you’re attempting to relax how stressed you actually are.`,
            `For you, it might feel freeing, in the moment, to spend.`,
            `For your partner, it might feel terrifying.`,
            `This makes things like vacations or date nights particularly difficult because of how much you are wanting to spend versus how much your partner is willing to spend.`,
            `You will have to be really careful not to equate this with how much love your partner has for you.`,
            `In this relationship, it usually turns out that neither partner wants to deal with the finances, so it will be critical to do this work together.`,
            `If both of you don’t step up, your money struggles may fester into a giant, stinky emotional wound.`
        ],

        "The Spend Block-The Procrastination Block": [
            `If you are feeling overwhelmed with overdue bills and as though you’re always waiting for the next paycheck to come in, but the minute it does come in it’s gone, these money blocks need to be healed before you will ever find financial harmony.`,
            `You may feel completely frustrated with your partner or may even see them as lazy, but that response is going to create an inappropriate power dynamic in your relationship that is both unfair and unworkable.`,
            `Much as how the spend block and the hard work block intertwine, you might end up with a partner who feels that it is their responsibility to bail you out of overspending, but in this case your partner may also be frozen in inaction because of they feel overwhelmed.`,
            `No matter the cause of the spending, it is going to be your responsibility to take ownership of this behavior and work through it with consistency and tenacity.`,
            `Otherwise, your partner may feel as though they are drowning financially.`
        ],

        "The Spend Block-The Money Guilt Block": [
            `In this case, you both might be spenders, where it is on the family or each other, and your partner may be spending on other people due to their guilt block.`,
            `When your partner feels guilty about having money or privilege, they are actually put in a disempowering financial position.`,
            `It is possible to recognize your privilege and still be able to receive money and do amazing things with it that help people affected by disparities in the system that create true lack for them (not a perceived lack driven by a lack block).`,
            `One of the best ways to recognize if this is affecting your relationship is to take note if you ever feel as though your partner should be spending more money on you than on other people, and if you feel that they have terrible money boundaries.`,
            `You actually do too (*gasp!*); it’s just always easier to see in other people, isn’t it?`
        ],

        "The Worthiness Block-The Lack Block": [
            `Sometimes when we are dating, we unconsciously choose people who affirm what we already believe about ourselves, even though what we believe might be unhealthy.`,
            `Every single person feels unworthy in a tiny piece of their spirit and sadly that’s just the human experience.`,
            `However, for some people, that little thread of unworthiness becomes a giant tapestry in which we wrap our hearts, and it guides most of our decision-making.`,
            `When we really struggle with feeling that we are never enough, we can sometimes end up in partnerships where this is affirmed.`,
            `So, even if you have a really incredible partner who loves you and thinks you’re amazing, if they have a lack block, you may unconsciously believe this is because you don’t deserve it.`,
            `That one hurt to read, didn’t it?`
        ],

        "The Worthiness Block-The Spend Block": [
            `One of the reasons why you might feel absolutely certain about your lack of worth is by being in a relationship with somebody who is always giving it away.`,
            `Ouch. I know. You aren’t doing this on purpose, and neither is your partner; it’s simply that sometimes we can’t see the patterns that run our lives because they are so constant that they become unnoticeable.`,
            `If I tell you to imagine you are sitting in your kitchen in silence, you won’t “hear” anything.`,
            `But next time you ARE sitting in your kitchen, listen for the sound of the refrigerator.`,
            `You have to intentionally notice it, or it just fades into the background.`,
            `It’s always running and is programmed to constantly use up energy.`,
            `We often don’t notice when we have a worthiness block because that feeling of not being enough becomes so normal that it gets comfortable.`,
            `Your partner (hopefully!) doesn’t want you to feel this way and may even try to show you or tell you that you are worthy, but it is not their job to do so.`,
            `If they are spending to try and show you love, then they are trying to bail out the Titanic with an ice cream pail.`
        ],

        "The Worthiness Block-The Worthiness Block": [
            `These relationships can sometimes become volatile because, when you feel as though you are never enough and you’re with someone who feels as though they are never enough, then feeling unworthy can become a self-fulfilling prophecy, meaning you will look for ways to BE unworthy.`,
            `This is ultimately a lie because every human is worthy.`,
            `Take note if the driving force in your life is to people please or prove your worth, OR if your driving force is trauma.`,
            `If you’ve experienced abuse or neglect or consistent challenges to your self-esteem, sometimes when unhealed those damaging patterns can be repeated in how you relate to other people.`,
            `Even if you don’t have obvious issues in your relationship, individual and couples’ counselling (both, not either/or) will be a great gift you can give yourselves and the partnership.`,
            `You may need to make it a priority in the budget.`
        ],

        "The Worthiness Block-The Intelligence and Skill Block": [
            `Because of your own feelings of inadequacy, sometimes you can end up undermining your partner.`,
            `It’s important to recognize that your partner also has feelings of inadequacy, especially when it comes to their intelligence.`,
            `If these blocks go unrecognized in your partnership, you may end up feeling a general malaise about the relationship over time, or it may feel stagnant or depolarized.`,
            `This means that the relationship could struggle to grow, or that the passionate charge (the polarization) of the coupledom could dissipate.`,
            `The solution is not buying sexy underwear and draping yourself across a chaise lounge like George Costanza.`,
            `The antidote is a renewed commitment to doing the deep work required to improve both your personal and your financial circumstances, so that you can show up better for your partner and for your own life.`
        ],

        "The Worthiness Block-The Hard Work Block": [
            `When you have a partner who is constantly working, has a difficult job, and endlessly thinks about work or how to make money, and if you question whether you are worthy, it can feel as though your partner’s efforts are fruitless.`,
            `You would think that this would make them realize that working harder is not the answer, and that they would work smarter and then spend more time with you.`,
            `But what can often happen here is that they feel as though nothing they do can please you, and so they just bury themselves more in their work.`,
            `Some partners get their identity from work, meaning they don’t know who they are if they aren’t working.`,
            `This whole arrangement compounds if you have a primary love language of quality time, yet your partner participates in “acts of service” in order to demonstrate their love.`
        ],

        "The Worthiness Block-The Stress Block": [
            `When you feel less than and your partner feels that money is stressful, you will often internalize that the reason your partner is stressed and wants to avoid money or fixate on money is because of you—something you’ve done or who you are.`,
            `You will carry an extraordinary amount of blame in this relationship, even when it is unfounded (hint: it’s mostly unfounded.) When it comes to money, this partnership may experience bouts of hopelessness and frustration, and it can be very difficult to work toward financial goals when there isn’t an absolutely clear vision of where the partnership is headed.`,
            `In this relationship it’s going to be important for both partners to focus on gratitude, abundance, and paying attention to and celebrating the things that go well—no matter how small.`,
            `You’ll need to do it for each other, but you’ll need to get in the practice of doing it for you, too.`
        ],

        "The Worthiness Block-The Procrastination Block": [
            `In some respects, procrastination can be the result of your feeling unworthy because often procrastination shows up as a by-product of perfectionism. Black-and-white thinking.`,
            `All-or-nothing. So, when you have somebody that doesn’t think they are worthy of very much and somebody who only thinks they’re worthy when something is perfectly executed, you have the perfect storm swirling in a land of wishing things would be better but not feeling capable of making them so.`,
            `The cool kids would call this a “low vibe” relationship.`,
            `Those of us who did not get the memo that skinny jeans are out (the uncool kids) would call this an opportunity to choose the possibility of failure in the name of growth.`,
            `You are going to have to get used to struggling in the gray areas of life for a while, but the good news is that I hear there are fifty shades of them.`,
            `You and your partner will need to find out what shade suits you best.`
        ],

        "The Worthiness Block-The Money Guilt Block": [
            `When you feel as though you don’t have enough, aren’t worthy of enough, or are simply not enough, and when your partner feels as though everything is too much, we have a great disparity in the way finances are viewed.`,
            `Relationships are successful when both partners have a healthy belief about what the purpose of the relationship is and then (often unknowingly) work to keep that identity true.`,
            `If we are committed to a disempowering identity, even if our partner believes it exists in the name of the greater good, our relationship can erode quickly and radically because it cannot hold the weight of the financial strain.`,
            `In this relationship, you might notice that one of the things that initially attracted you to your partner was the way they cared so deeply for others, but now the things that initially attracted you might annoy the ever-living heck out of you.`
        ],

        "The Intelligence and Skill Block-The Lack Block": [
            `When we think we’re not smart enough to know something, we cut ourselves off from the possibility of learning.`,
            `Of course, we can’t possibly know everything there is to know, but for some reason when we grow up we assume that the minute we turn 18 we’re supposed to become financially literate (even though most of us have had very little exposure to money by the time we leave home).`,
            `When we feel like we are not smart enough and our partner feels like there is never going to BE enough, we create an environment where we live with very low standards.`,
            `When low standards become normal, it’s very difficult to find abundance and financial freedom.`
        ],

        "The Intelligence and Skill Block-The Spend Block": [
            `When you feel as though you’re not smart enough and your partner receives money and then immediately spends it, whether because they feel as though they can’t manage it or they have a spending problem, you can give your power away to your partner so that the money decisions and the spending is mostly in the hands of somebody who feels financially out of control.`,
            `This block allows you to stay stuck so that you can “be right,” which in one of those weird, twisty ways makes you feel smart.`,
            `But that’s just it, isn’t it? It doesn’t work long-term to “feel” smart.`,
            `It is so much better to be smart.`
        ],

        "The Intelligence and Skill Block-The Worthiness Block": [
            `When you feel as though everybody else knows more than you, and when you are looking for the external solution to an internal struggle with your own intelligence, a partner with a worthiness issue can be made to feel as though they are not valued—especially if they have an opinion on what needs to be done and you keep seeking outside advice.`,
            `There are millions of smart people who are broke`,
            `It’s also entirely possible to be dumb and rich.`,
            `The financial healing you’ll work through has nothing to do with what you actually know and everything to do with how you approach learning.`
        ],

        "The Intelligence and Skill Block-The Intelligence and Skill Block": [
            `When both partners struggle with a primary block of intelligence or lack of skill, it may often feel as though you are chasing riches.`,
            `When both partners feel that what they lack is intelligence when it comes to money, you may fall pretty quickly for get-rich-quick schemes or terrible financial advice because you are putting more trust in other people than in your own critical-thinking skills.`,
            `You also are cut off from your ability to hear your own gut instinct and will often try to reason or rationalize poor financial decisions rather than educate yourself.`,
            `In this relationship you’ll both need to be careful to avoid one-upmanship, where you try to outdo your partner in response to your own low self-esteem.`
        ],

        "The Intelligence and Skill Block-The Hard Work Block": [
            `One of the challenges associated with feeling as though you don’t have the right skills or the right knowledge (and with not trusting yourself to get it), is that if you are partnered with somebody who is a very hard worker and believes hard work is the key to success, you can often undermine your partner’s efforts by comparing them to other people who seem to have it all together.`,
            `Comparison in a relationship can often cause its death, and we know that it certainly causes the death of joy.`,
            `It is going to be critical in this relationship combination to focus on progress, no matter how small, in order to start stacking happiness.`
        ],

        "The Intelligence and Skill Block-The Stress Block": [
            `When you feel as though other people know more or are more capable than you, and when your partner finds that money in general is stressful, they may ostrich—or bury their head in the sand—when it comes to finances. Because you are also not actively obtaining the right education or taking effective action, you often miss out on the compound effect of little bits of wealth building and adding up over a long period of time.`,
            `The other type of thinking that can creep into this scenario is one of waiting for big rescues to happen.`,
            `There may be a temptation in this relationship to consolidate debt or sell assets in order to take vacations in hopes of reducing stress; it might be tempting to look for quick fixes or big moves when, essentially, these end up being ineffective if you haven’t done the inner work first.`
        ],

        "The Intelligence and Skill Block-The Procrastination Block": [
            `If you feel as though you don’t know something and you are coupled with a partner who has a hard time getting started on things, you might silently view your partner as incompetent and, subsequently, feel horrible about that.`,
            `In this relationship, sometimes one partner will act as a “coach” and may try to motivate the partner who has a difficult time starting or finishing things.`,
            `I can’t recall a time when any person ever put on their Tinder profile that they were “looking for a mate who will point out my shortcomings and teach me how to overcome them while silently seething inside,” so this relationship needs to be very mindful of any shifts in respect or power differentials.`
        ],

        "The Intelligence and Skill Block-The Money Guilt Block": [
            `In this particular situation, you may often feel stupid because, if you feel as though you are undeserving and your partner often feels guilty, then, when they do receive something, you might create a dynamic where you reject both learning and receiving.`,
            `This becomes compounded if there is other guilt in your relationship, such as survivor’s guilt, where your partner may feel confused or conflicted about an outcome they could not control and yet feel responsible for.`,
            `All unfounded guilt presumes that life is fair and logical and reasonable, and it expects that there are certain predictable outcomes. 
            A definite recipe for disappointment.`
        ],

        "The Hard Work Block-The Lack Block": [
            `This combo is tough because when you are a hard worker and feel that your financial situation will only improve if you work hard—especially when everything already feels difficult—and when you are with a partner who feels that there will never be enough, it can seem as though you are staring down the barrel of a life that will contain little joy.`,
            `You might think of other people who struggle financially, “If only they worked harder,” a challenging mindset given that you’ve proven to yourself already that hard work doesn’t guarantee success or happiness.`,
            `Your expectations of your partner may be a point of pain (for either of you!) so please tread kindly.`
        ],

        "The Hard Work Block-The Spend Block": [
            `This one can feel as though you are constantly trying to bail out a leaky boat while your partner keeps drilling holes in it.`,
            `It can be particularly challenging for relationships because you might feel disrespected or that your partner doesn’t value how hard you work, while they can sometimes appear to you to be reckless.`,
            `This relationship may burn out or feel exhausting quite quickly, and it is going to require a lot of compassion instead of judgment if it is to survive.`
        ],

        "The Hard Work Block-The Worthiness Block": [
            `You may feel as though you’re working hard or that the solution is to work hard, and, meanwhile, somebody is wallowing in an issue where they just don’t believe they are enough, and sometimes it’s difficult to extend them grace when you really need to.`,
            `If your solution is just to work harder—work that you give to your job and not your relationship— then it will be really challenging for you to stay motivated to remain in the relationship.`,
            `The solution is not external.`,
            `It’s not a different partner or more work.`,
            `Fixing the relationship is going to require deep accountability and honesty, and a willingness to work hard on the inside instead of just working long hours on the outside.`
        ],

        "The Hard Work Block-The Intelligence and Skill Block": [
            `Workaholism might show up in this relationship for one or both parties.`,
            `The other thing that may show up at times (in addition to the physical work) is the feeling that you have to carry the emotional weight for your partner because of the doubt they have in their own abilities.`,
            `Sometimes when we are stuck in a financial rut, taking some sort of action, like working hard, can feel like progress, but we need to be mindful about whether repeating this strategy day after day actually gets us to where we want.`
        ],

        "The Hard Work Block-The Hard Work Block": [
            `This relationship might often feel like ships passing in the night.`,
            `If everything feels as though it must be hard to be worth it, and if everyone either feels as though there’s not enough hours in the day to make ends meet or achieve the level of success you desire, it’s going to be nearly impossible to connect emotionally to your partner.`,
            `Sometimes people who believe they have to work hard actually don’t need to work harder to create wealth.`,
            `Often, working hard is a distraction to avoid leaning into feelings or conversations or trauma or anything that might feel difficult and can be avoided with the justification of hard work.`
        ],

        "The Hard Work Block-The Stress Block": [
            `When you feel as though the only way money should come to you or that you deserve it is if you’ve worked really hard for it, and if your partner feels as though everything about money is stressful, as a couple you are likely missing lots of financial opportunities because you are not open to receiving.`,
            `You’ve got your head down working, and your partner has their arms folded across their chest stressin’, and the two of you are potentially closing yourselves off to opportunities.`,
            `You might be around other couples who seem to “have it all,” and they work less hours and seem to have more fun.`,
            `You might be romanticizing the benchmarks and creating “when I” scenarios. (“When I get the next overtime check, then I will stop working so much.”) You might already know from experience that never actually changes.`
        ],

        "The Hard Work Block-The Procrastination Block": [
            `This is a really challenging combination because if one partner believes hard work is the answer to financial success, and if the other partner can only get things done if conditions are perfect or there is a deadline forcing them into action, then you almost have partners working on opposing sides.`,
            `One partner might show up with frustration that the other isn’t working as hard, and the other partner might feel completely inadequate because they aren’t able to get started or aren’t feeling driven.`,
            `It will be crucial to watch your negative assumptions about the other person’s work ethic, not just because you might be mistaken, but mostly because it lacks compassion.`
        ],

        "The Hard Work Block-The Money Guilt Block": [
            `If you have a hard work block and your partner feels guilty about everything money-related and wants to give it away, or if your partner has a spiritual belief system about money, often both partners can end up working much harder than they need to in order to compensate for the injustices in the world.`,
            `The challenge is that no amount of hard work or guilt from one couple can solve the world’s poverty issues as much as teamwork, initiative, love, and acceptance.`,
            `So, the very things you worry about in the partnership, such as time, stress, and finances, cannot be solved anyway until you heal the money blocks you each are individually experiencing.`
        ],

        "The Stress Block-The Lack Block": [
            `When you believe that having more money just means you are guaranteed to have more problems, and when your partner believes that you will never have enough, then anything your partner does to bring in more money (even though they might feel hopeless about it) they may avoid telling you about because they are worried about bringing you stress.`,
            `And, with this money block combination, sometimes couples end up getting caught in financial infidelity because what starts off as a good intention of trying not to cause stress to a partner ends up creating secrets and, perhaps, even lies about financial circumstances in order to avoid conflict.`,
            `Your primary desired outcome will be to not transfer your stress onto your partner in order to justify its existence.`
        ],

        "The Stress Block-The Spend Block": [
            `I think you can see the writing on the wall with this one.`,
            `If everything financially stresses you out and your partner is overspending, then, the majority of time, your emotional home (the place you live emotionally for most of your life) is stress.`,
            `And then, when you are stressed all the time and you are in a relationship with somebody that has even a little bit of an emotional-spending pattern, then we know stress could possibly trigger them to spend more, in turn causing you to stress more.`,
            `You can see how this pattern quickly gets out of hand.`
        ],

        "The Stress Block-The Worthiness Block": [
            `Sometimes when you stress about money, you try to avoid stress by avoiding money.`,
            `When you are partnered with someone who feels unworthy when it comes to financial situations (or even financial discussions), what can sometimes occur is avoidance or neglect, again.`,
            `In the case of somebody who already feels massively unworthy, this can contribute to a deeper wounding when it comes to their feelings of value in the relationship.`,
            `You are not responsible for your partner feeling worthy, but when we are in partnership with somebody, we need to be careful to hold their heart tenderly and to not be reckless with how we treat them because of our own stresses or feelings of inadequacy.`,
            `This one is a delicate dance.`
        ],

        "The Stress Block-The Intelligence and Skill Block": [
            `When finances activate your nervous system and your partner feels they do not have the ability or intelligence to figure out what action to take, the relationship can feel as though it’s not getting anywhere, financially speaking.`,
            `In this situation, it can even be difficult for a partner to engage in any type of learning because often education costs money, and, when one partner is very stressed and can’t figure out how to get ahead, the other partner can feel as they never will.`,
            `Spending on education becomes stressful, and yet not getting an education can also feel stressful, so you walk the line of indecision for a long time.`
        ],

        "The Stress Block-The Hard Work Block": [
            `When you are somebody who is stressed financially, oftentimes you worry.`,
            `When you have a partner who believes that the way out of the financial stress is through hard work, the relationship becomes compounded with worry.`,
            `It gets extra spicy if you worry about them when they work too much, or you worry about them if they aren’t working enough, and then you also worry about whether you are working or contributing enough in order to make the relationship fair.`,
            `It can be extremely challenging to have conversations that are deep and meaningful because so much of this relationship is focused on surface or external solutions.`
        ],

        "The Stress Block-The Stress Block": [
            `Maybe you feel stressed financially because your parents were always stressed financially, and somehow you picked up along the way that money causes tension in a relationship.`,
            `In this case, you are in the perfect partnership to commiserate!`,
            `If we aren’t careful in this relationship, we can “one up” each other with how stressed we feel, and it can be challenging to find solutions when so much of our identity when it comes to money is found in the problem itself.`,
            `No matter where your financial stress comes from, you’ve learned that money activates the part of you that isn’t present, that is focused on what hasn’t happened yet or on all the things that could go wrong.`,
            `This puts an energetic burden on both partners, who are overwhelmed already by their own stress!`,
            `In this situation, you either don’t take enough action toward achieving your financial goals or you are often undoing your success because you are second-guessing it.`
        ],

        "The Stress Block-The Procrastination Block": [
            `This is a great blame-y, finger-pointy relationship because you can easily claim that you are stressed because your partner procrastinates when it comes to money.`,
            `However, your partner can easily claim that the reason they procrastinate is because you are so stressed and they don't want to make a bad or wrong decision.`,
            `You also might think your stress would go away if your partner didn’t procrastinate, but stress is an inside job, and your greatest self-development will come when you can manage in spite of any external circumstances.`
        ],

        "The Stress Block-The Money Guilt Block": [
            `In this relationship, you are usually excellent givers because the thought of having money or receiving money for you is very stressful.`,
            `You likely often feel guilty because there are other people in the world who are worse off than you.`,
            `The irony here is that you can help more people when you are able to receive and be good stewards of money.`,
            `Even though you’re giving your money away in order to relieve stress and guilt, it’s not nearly as beneficial as building true wealth and giving a larger portion of a larger amount of money away.`
        ],

        "The Money Guilt Block-The Lack Block": [
            `When you feel that the world is unjust or unfair, you sometimes cut off receiving blessings because you feel it’s taking away from other people who deserve such blessings too.`,
            `Unfortunately, this isn’t how the world works, and starving yourself does not feed everyone else.`,
            `Your guilt block might have been formed in your younger years, particularly if you were exposed to religion or the social sciences and you felt a deep caring for other people.`,
            `This is an important part of the human experience, but it’s necessary to live from a position of strength if you are to properly impact and support people who need you.`,
            `As the saying goes, you cannot pour from an empty cup, and when you have a guilt block and your partner has a lack block, you are constantly trying to do so.`
        ],

        "The Money Guilt Block-The Spend Block": [
            `This is another relationship combination that may experience financial infidelity because, when you are trying to impart your belief system about what is fair onto your partner (who may be expressing their own financial stress by spending), it makes it difficult for them to feel as though they can safely be honest with you.`,
            `They may be concerned about receiving judgment from you, or they may be worried about disappointing you.`,
            `And sometimes people who have a guilt block will try to shame someone else so that they can feel justified in their guilty feelings.`,
            `Be mindful to be open and loving (read ahead on the levels of intimacy) so that your partner can begin to feel safe and connected first, for safety and connection don’t come after healing. Our partners must feel safe and connected IN ORDER to heal.`
        ],

        "The Money Guilt Block-The Worthiness Block": [
            `When you have a guilt block and you feel that your blessings are inappropriate, you may want to alleviate the guilt at times.`,
            `This can mean you are often giving resources away.`,
            `If you are partnered with somebody who has a worthiness challenge, this can impact them by reiterating that they are not worthy of receiving because you’ll give to others first.`,
            `They may feel emotionally unsafe.`,
            `Financial boundaries will need to be created and reinforced to ensure that your partner feels secure financially and that you feel the freedom to give, provided it is not impacting the resources you need to experience financial calmness together.`
        ],

        "The Money Guilt Block-The Intelligence and Skill Block": [
            `The guilt block is often associated with negative forms of regret or stress that make you believe you are responsible for causing harm to other people.`,
            `In turn, this usually means that you struggle to forgive yourself.`,
            `Whether your actions are real or perceived, you’ll carry this weight, and the feelings you generate about yourself will limit your ability to help in the future.`,
            `Guilt is very disempowering, whereas it is possible to feel a compassion for the world and desire to help people that comes from an empowering place.`,
            `In a partnership, when we feel disempowered and our partner feels as though they lack intelligence or the necessary skills in order to build wealth, we allow ourselves to stay in a state where we will never be challenged or, perhaps, will never challenge each other in order to avoid conflict.`,
            `But by never challenging each other we do not allow ourselves the opportunity to grow and contribute in a way that serves people on a larger scale.`
        ],

        "The Money Guilt Block-The Hard Work Block": [
            `When you feel as though things are your fault most of the time, or you wonder how you could possibly deserve something when there’s so much awful going on in the world, and when your partner is out working hard, neither of you will ever actually reach the end goal—because there’s no such thing.`,
            `It is impossible to ever feel as though you have enough success or enough wealth, so both of these blocks allow you to live in a place where you’re never truly present.`,
            `You are always trying to solve the future’s problems, and by doing so you miss out on a lot of today’s blessings.`,
            `You probably already carry some of that regret.`
        ],

        "The Money Guilt Block-The Stress Block": [
            `When you feel as though a lot of the challenges out exist because of you or because of what you have or what you are able to experience, and if you’re in a partnership with somebody who has a stress block, you may be inadvertently causing them more stress because you carry the weight of the world on your shoulders.`,
            `Conversations about money with your partner may already feel overwhelming because, if you are both already stressed and you are carrying the stress of everything else in the world, you don’t live in a solutions-oriented relationship.`,
            `You live in a relationship where you are only ever bringing problems to each other’s attention.`,
            `This is a great opportunity to shift and one of the easiest things in your control.`
        ],

        "The Money Guilt Block-The Procrastination Block": [
            `When you have tremendous guilt about all the things that are happening in the world, and your partner struggles with a procrastination block, it can feel as though there’s no end in sight.`,
            `This is because there’s no progress being made in this relationship.`,
            `Depending on how long you’ve had the guilt block, you might be getting so comfortable blocking opportunities that you are like an NHL goalie in the Stanley Cup Final: all reflexes.`,
            `If your guilt stems from some of the injustices in the world, it can be tempting to “educate” other people on these disparities/inequalities, but the best strategy of all is to take care of yourself first so that you are in a good position to help, and then you can inspire people with your actions and progress.`
        ],

        "The Money Guilt Block-The Money Guilt Block": [
            `Guilt is both experienced and expressed in different ways, but when you and your partner both have a primary guilt block, we have to watch that you or your partner does not try to solve your financial problems with manipulation.`,
            `People who feel a tremendous amount of guilt often experience manipulation because guilt is a manipulative emotion.`,
            `It doesn’t allow you to see things as they actually are; it allows you to see things only in relation to yourself.`,
            `Perhaps you and your partner bonded over some of the things for which you both experience guilt.`,
            `This is a great opportunity to create compelling financial goals that allow you to truly serve and help others—not from a place of guilt, but rather from a place of love and service.`
        ],
    }];

    for (let i = 0; i < totalValues.length; i++) {
        if (highestValue === totalValues[i]) {
            numberOfInstances++;
            filteredMoneyBlocks.push(moneyBlocks[i]);
        }
    }

    if (numberOfInstances === 1) {
        disableDropdown = true;
    }

    const handleChange = (event) => {
        setDropdownValue(event.target.value);
        setSelfDescription(filteredMoneyBlocks[event.target.value]);
    }

    const handleSpouseChange = (event) => {
        setSpouseDropdownValue(event.target.value);
        setSpouseDescription(moneyBlocks[event.target.value]);
    }

    const sendQuiz = (event) => {
        event.preventDefault();
        setUserBookViewModal(true);

        axios.post(`http://ec2-15-223-72-54.ca-central-1.compute.amazonaws.com:5000/`, {
            email
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    };

    const enterEmail = (event) => {
        setEmail(event.target.value);
    }

    return (
        // sx={{ m: 20 }}
        <Box sx={{ marginLeft: "10%", marginTop: "5%" }}>
            <Typography variant="h6"> <b>Steps to analyze your result.</b></Typography>
            <br />
            <Typography align='left' variant="h6">
                <KeyboardArrowRightIcon sx={{ color: '#D54B6C' }} /> Choose your primary money block from the drop down menu. <br />
                <KeyboardArrowRightIcon sx={{ color: '#D54B6C' }} /> Then choose your partner’s primary money block. <br />
                <KeyboardArrowRightIcon sx={{ color: '#D54B6C' }} /> You’ll learn what is happening underneath the financial friction you might be feeling. <br />
                <KeyboardArrowRightIcon sx={{ color: '#D54B6C' }} /> These represent the most common themes of the relationship combinations, but, as always, you &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; are two unique people who bring your unique personalities to create a unique relationship, and &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you might find that your financial blocks show up in unique ways. <br />
                <KeyboardArrowRightIcon sx={{ color: '#D54B6C' }} /> To heal your money blocks, pre-order your copy of Naked Money Meetings today.</Typography>
            <br />
            <br />
            {/* Revealing money blocks dialog box */}
            <Dialog fullWidth={true} maxWidth={"sm"} open={!ifDialogOpen && !ifRevealBlockOpen} >
                <DialogTitle sx={{ marginLeft: "25%" }}>{filteredMoneyBlocks.length === 1 ? "Your Money Block is :-" : "Your Money Blocks are :-"}</DialogTitle>
                <DialogContent>
                    {filteredMoneyBlocks.map((value, index) => {
                        let indexString = index.toString();
                        let valueString = value;
                        return <Typography key={index} name={valueString} value={indexString}>{value}</Typography>
                    })}
                </DialogContent>
                <DialogActions>
                    <Button size="large" variant='contained' onClick={() => setIfRevealBlockOpen(true)}>Proceed</Button>
                </DialogActions>
            </Dialog>

            {/* loader */}
            <Dialog fullWidth={true} maxWidth={"xs"} open={ifDialogOpen} >
                <DialogTitle sx={{ marginLeft: "25%" }}>Calculating Results</DialogTitle>
                <DialogContent>
                    <CircularProgress sx={{ marginLeft: "45%" }} />
                </DialogContent>
            </Dialog>

            {/* last dialog box, for the user to view the book  */}
            <Dialog fullWidth={true} maxWidth={"sm"} open={userBookViewModal}>
                <DialogTitle align="left">To heal your money blocks, pre-order your copy of <b>Naked Money Meetings</b> today.</DialogTitle>
                <DialogContent align="right">
                    <a href="https://www.amazon.com/Naked-Money-Meetings-Partner-Forever/dp/1637587791/ref=sr_1_1?crid=3NCT78ESEGHCS&keywords=naked+money+meetings+erin+skye+kelly&qid=1676239960&sprefix=naked+money+meetings+erin+skye+kelly%2Caps%2C114&sr=8-1">
                        <Button variant="contained">
                            Learn more
                        </Button>
                    </a>
                </DialogContent>
            </Dialog>


            <Grid justifyContent="center" spacing={4} container={true}>
                <Grid item md={6}>
                    <FormControl sx={{ minWidth: 300 }}>
                        <InputLabel sx={{ marginLeft: "5%" }} variant='standard'>
                            Your Money Block
                        </InputLabel>
                        <Select onChange={handleChange} disabled={disableDropdown} value={dropdownValue}>
                            {filteredMoneyBlocks.map((value, index) => {
                                let indexString = index.toString();
                                let valueString = value;
                                return <MenuItem key={index} name={valueString} value={indexString}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <Box>
                        {blocksDescription.map(element => {
                            if (selfDescription === "")
                                selfDescription = filteredMoneyBlocks[0]
                            return "";
                        })
                        }
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <FormControl sx={{ minWidth: 300 }}>
                        <InputLabel sx={{ marginLeft: "5%" }} variant='standard'>
                            Partner's Money Block
                        </InputLabel>
                        <Select onChange={handleSpouseChange} value={spouseDropdownValue}>
                            {moneyBlocks.map((value, index) => {
                                let indexString = index.toString();
                                return <MenuItem key={index} value={indexString}>{value}</MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <Box>
                        {blocksDescription.map(element => {
                            let dataArray = element[spouseDescription];
                            if (dataArray === undefined)
                                return "";
                            return "";
                        })
                        }
                    </Box>
                </Grid>
            </Grid>
            <Grid>
                {
                    (selfDescription && spouseDescription) &&
                    <Typography variant="h5"> <br /> <b>Money Block Results: </b></Typography>
                }
            </Grid>
            <Grid justifyContent="center" container={true}>
                {
                    (selfDescription && spouseDescription) &&
                    <Typography align="left">
                        {blocksDescription[0][`${selfDescription}-${spouseDescription}`].map(ele => {
                            return [
                                // <br/>,
                                <Typography><EmojiObjectsIcon sx={{ color: "#05BDC9" }} />{ele}</Typography>
                            ]
                        }
                        )}
                    </Typography>
                }
            </Grid>
            <Grid justifyContent="center" container={true}>
                <form onSubmit={sendQuiz}>
                    <FormControl sx={{ marginTop: "20%" }}>
                        <Typography>Send this quiz to your partner</Typography>
                        <br />
                        <Typography sx={{ marginBottom: 1, color: 'gray' }} align='left'>E-mail</Typography>
                        <TextField required id='e-mail' type='email' placeholder='Enter e-mail' onChange={enterEmail} />
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        <br />
                        <br />
                        <Button size="large" type='submit' variant='contained'>SHARE QUIZ</Button>
                        <br />
                    </FormControl>
                </form>
            </Grid>
        </Box>
    );
}

export default QuizResult;
