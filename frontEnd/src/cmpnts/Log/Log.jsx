import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import APIaccess from '../../apiaccess';
import './Log.css';
const accessAPI = APIaccess(); 

/**
 * 09. 24. 2023
 * Component with creates list of post items from whatever blog / feed
 * Goes within wrapper element, so that logs throughout the site can
 * be distinguished
 */


function ReactionsSVG({}) {

	return (
		<svg 
			id="reactions"
			xmlns="http://www.w3.org/2000/svg" 
			width="40" 
			height="16" 
			viewBox="0 0 38.66 16">
		  <g id="Group_553" data-name="Group 553" transform="translate(-47.577 -479)">
		    <g id="Group_552" data-name="Group 552" transform="translate(1 -28)">
		      <g id="Group_542" data-name="Group 542" transform="translate(13.549)">
		        <g id="Ellipse_48" data-name="Ellipse 48" class="cls-1" transform="translate(34 507)">
		          <circle class="cls-6" cx="8" cy="8" r="8"/>
		          <circle class="cls-7" cx="8" cy="8" r="7.5"/>
		        </g>
		        <g id="Path_30" data-name="Path 30" class="cls-2" transform="matrix(0.914, -0.407, 0.407, 0.914, 47.008, 517.936)">
		          <path class="cls-6" d="M 1.612791776657104 2.134702444076538 C 0.7924217581748962 2.134702444076538 0.1250017732381821 1.46728241443634 0.1250017732381821 0.6469124555587769 C 0.1250017732381821 -0.2043138295412064 1.307873249053955 -2.479262590408325 1.612791419029236 -2.594990730285645 C 1.917709589004517 -2.479252815246582 3.100581884384155 -0.2043039053678513 3.100581884384155 0.6469124555587769 C 3.100581884384155 1.46728241443634 2.433161735534668 2.134702444076538 1.612791776657104 2.134702444076538 Z"/>
		          <path class="cls-8" d="M 1.612791776657104 -2.436519622802734 C 1.256522417068481 -2.079798698425293 0.2500016689300537 -0.1210035383701324 0.2500016689300537 0.646912693977356 C 0.2500016689300537 1.398352742195129 0.8613517284393311 2.009702682495117 1.612791776657104 2.009702682495117 C 2.364231824874878 2.009702682495117 2.975581645965576 1.398352742195129 2.975581645965576 0.646912693977356 C 2.975581645965576 -0.1209940910339355 1.969061136245728 -2.079797744750977 1.612791776657104 -2.436519622802734 M 1.612791776657104 -2.721677303314209 C 1.973971724510193 -2.721677303314209 3.225581884384155 -0.243807315826416 3.225581884384155 0.646912693977356 C 3.225581884384155 1.537632703781128 2.503511905670166 2.259702682495117 1.612791776657104 2.259702682495117 C 0.7220718860626221 2.259702682495117 1.668930053710938e-06 1.537632703781128 1.668930053710938e-06 0.646912693977356 C 1.668930053710938e-06 -0.243807315826416 1.251601815223694 -2.721677303314209 1.612791776657104 -2.721677303314209 Z"/>
		        </g>
		        <g id="Path_31" data-name="Path 31" class="cls-2" transform="matrix(0.914, 0.407, -0.407, 0.914, 33.947, 516.624)">
		          <path class="cls-6" d="M 1.612791776657104 2.134702444076538 C 0.7924217581748962 2.134702444076538 0.1250017732381821 1.46728241443634 0.1250017732381821 0.6469124555587769 C 0.1250017732381821 -0.2043138295412064 1.307873249053955 -2.479262590408325 1.612791419029236 -2.594990730285645 C 1.917709589004517 -2.479252815246582 3.100581884384155 -0.2043039053678513 3.100581884384155 0.6469124555587769 C 3.100581884384155 1.46728241443634 2.433161735534668 2.134702444076538 1.612791776657104 2.134702444076538 Z"/>
		          <path class="cls-8" d="M 1.612791776657104 -2.436519622802734 C 1.256522417068481 -2.079798698425293 0.2500016689300537 -0.1210035383701324 0.2500016689300537 0.646912693977356 C 0.2500016689300537 1.398352742195129 0.8613517284393311 2.009702682495117 1.612791776657104 2.009702682495117 C 2.364231824874878 2.009702682495117 2.975581645965576 1.398352742195129 2.975581645965576 0.646912693977356 C 2.975581645965576 -0.1209940910339355 1.969061136245728 -2.079797744750977 1.612791776657104 -2.436519622802734 M 1.612791776657104 -2.721677303314209 C 1.973971724510193 -2.721677303314209 3.225581884384155 -0.243807315826416 3.225581884384155 0.646912693977356 C 3.225581884384155 1.537632703781128 2.503511905670166 2.259702682495117 1.612791776657104 2.259702682495117 C 0.7220718860626221 2.259702682495117 1.668930053710938e-06 1.537632703781128 1.668930053710938e-06 0.646912693977356 C 1.668930053710938e-06 -0.243807315826416 1.251601815223694 -2.721677303314209 1.612791776657104 -2.721677303314209 Z"/>
		        </g>
		      </g>
		      <g id="Group_539" data-name="Group 539" transform="translate(13.549)">
		        <path id="Path_25" data-name="Path 25" class="cls-3" d="M0-.233A3.987,3.987,0,0,1,2.218-1.48c1.053,0,2,1.247,2,1.247" transform="translate(36.786 514.616)"/>
		        <path id="Path_27" data-name="Path 27" class="cls-3" d="M0,0A10.467,10.467,0,0,0,2.068.252,8.4,8.4,0,0,0,4,0" transform="translate(36.786 512.085) rotate(-17)"/>
		      </g>
		      <g id="Group_540" data-name="Group 540" transform="translate(13.549)">
		        <path id="Path_26" data-name="Path 26" class="cls-3" d="M0-.233A3.987,3.987,0,0,1,2.218-1.48c1.053,0,2,1.247,2,1.247" transform="translate(43 514.616)"/>
		        <path id="Path_28" data-name="Path 28" class="cls-3" d="M0,0A10.467,10.467,0,0,0,2.068.252,8.4,8.4,0,0,0,4,0" transform="matrix(0.966, 0.259, -0.259, 0.966, 43.35, 510.981)"/>
		      </g>
		      <g id="Group_541" data-name="Group 541" transform="translate(13.549)">
		        <g id="Path_29" data-name="Path 29" class="cls-2" transform="translate(39.125 515)">
		          <path class="cls-6" d="M 2.871293306350708 4.750000476837158 C 2.048103332519531 4.750000476837158 1.291073322296143 4.451740264892578 0.7943233251571655 3.931700468063354 C 0.4139232933521271 3.533470392227173 0.225713312625885 3.04235053062439 0.2500433027744293 2.511440515518188 C 0.257753312587738 2.34324049949646 0.2591933012008667 2.199410438537598 0.2604632973670959 2.07252049446106 C 0.2627333104610443 1.845670461654663 0.2648833096027374 1.631410479545593 0.3140133023262024 1.592360496520996 C 0.4179632961750031 1.509730458259583 0.911383330821991 1.509730458259583 1.148513317108154 1.509730458259583 C 1.320163249969482 1.509730458259583 1.518583297729492 1.511950492858887 1.748353362083435 1.514520406723022 C 2.069253206253052 1.518100380897522 2.432973384857178 1.522160410881042 2.871293306350708 1.522160410881042 C 3.19580340385437 1.522160410881042 3.484153270721436 1.520610451698303 3.740283250808716 1.519230484962463 C 3.944143295288086 1.518130421638489 4.127513408660889 1.51714038848877 4.292423248291016 1.51714038848877 C 4.715573310852051 1.51714038848877 5.355053424835205 1.51714038848877 5.461813449859619 1.626860380172729 C 5.511043071746826 1.677460432052612 5.505013465881348 1.897340416908264 5.498623371124268 2.130130529403687 C 5.49565315246582 2.238530397415161 5.492283344268799 2.361400365829468 5.492283344268799 2.500000476837158 C 5.492283344268799 3.740650415420532 4.316513538360596 4.750000476837158 2.871293306350708 4.750000476837158 Z"/>
		          <path class="cls-8" d="M 1.148513317108154 1.759730339050293 C 0.8420424461364746 1.759730339050293 0.6309280395507812 1.768714427947998 0.5181818008422852 1.786494255065918 C 0.5125608444213867 1.863885402679443 0.511418342590332 1.977682590484619 0.5104432106018066 2.075020551681519 C 0.5091533660888672 2.204010486602783 0.5076932907104492 2.350220441818237 0.4997835159301758 2.522890329360962 C 0.4786534309387207 2.983920335769653 0.6430134773254395 3.411370515823364 0.9751033782958984 3.759020328521729 C 1.418303489685059 4.223000526428223 2.127163410186768 4.500000476837158 2.871293306350708 4.500000476837158 C 4.17866325378418 4.500000476837158 5.242283344268799 3.602800369262695 5.242283344268799 2.500000476837158 C 5.242283344268799 2.357970476150513 5.245703220367432 2.233290433883667 5.24872350692749 2.12328052520752 C 5.251657485961914 2.016322612762451 5.255111694335938 1.890417098999023 5.251143455505371 1.809183120727539 C 5.042515754699707 1.767134666442871 4.528249740600586 1.76714038848877 4.292423248291016 1.76714038848877 C 4.127913475036621 1.76714038848877 3.944993257522583 1.768130302429199 3.741633415222168 1.769220352172852 C 3.485093355178833 1.770610332489014 3.196303367614746 1.772160530090332 2.871293306350708 1.772160530090332 C 2.431583404541016 1.772160530090332 2.067123413085938 1.76809024810791 1.745563268661499 1.764500617980957 C 1.516543388366699 1.761940479278564 1.318763256072998 1.759730339050293 1.148513317108154 1.759730339050293 M 1.148510932922363 1.259735107421875 C 1.55718994140625 1.259735107421875 2.113508462905884 1.272160530090332 2.871293306350708 1.272160530090332 C 6.086923122406006 1.272160530090332 5.742283344268799 1.119290351867676 5.742283344268799 2.500000476837158 C 5.742283344268799 3.880710363388062 4.456893444061279 5.000000476837158 2.871293306350708 5.000000476837158 C 1.285693168640137 5.000000476837158 -0.06621646881103516 3.951600551605225 0.0003032684326171875 2.500000476837158 C 0.0511474609375 1.390479564666748 -0.1770229339599609 1.259735107421875 1.148510932922363 1.259735107421875 Z"/>
		        </g>
		        <line id="Line_270" data-name="Line 270" class="cls-4" x2="5.378" transform="translate(39.122 517.5)"/>
		      </g>
		    </g>
		    <g id="Group_551" data-name="Group 551" transform="translate(-8 -28)">
		      <g id="Group_547" data-name="Group 547" transform="translate(33)">
		        <g id="Ellipse_48-2" data-name="Ellipse 48" class="cls-1" transform="translate(34 507)">
		          <circle class="cls-6" cx="8" cy="8" r="8"/>
		          <circle class="cls-7" cx="8" cy="8" r="7.5"/>
		        </g>
		      </g>
		      <g id="Group_549" data-name="Group 549" transform="translate(33 0.616)">
		        <path id="Path_25-2" data-name="Path 25" class="cls-3" d="M0-.233A3.987,3.987,0,0,1,2.218-1.48c1.053,0,2,1.247,2,1.247" transform="translate(36.786 514.616)"/>
		        <path id="Path_27-2" data-name="Path 27" class="cls-3" d="M0,0A10.467,10.467,0,0,0,2.068.252,8.4,8.4,0,0,0,4,0" transform="translate(36.786 512.085) rotate(-17)"/>
		      </g>
		      <g id="Group_550" data-name="Group 550" transform="translate(33 0.616)">
		        <path id="Path_26-2" data-name="Path 26" class="cls-3" d="M0-.233A3.987,3.987,0,0,1,2.218-1.48c1.053,0,2,1.247,2,1.247" transform="translate(43 514.616)"/>
		        <path id="Path_28-2" data-name="Path 28" class="cls-3" d="M0,0A10.467,10.467,0,0,0,2.068.252,8.4,8.4,0,0,0,4,0" transform="matrix(0.966, 0.259, -0.259, 0.966, 43.35, 510.981)"/>
		      </g>
		      <g id="Ellipse_49" data-name="Ellipse 49" class="cls-5" transform="translate(73 517)">
		        <circle class="cls-6" cx="2" cy="2" r="2"/>
		        <circle class="cls-7" cx="2" cy="2" r="1.75"/>
		      </g>
		      <g id="Rectangle_231" data-name="Rectangle 231" class="cls-1" transform="translate(71 514)">
		        <rect class="cls-6" width="2" height="8"/>
		        <rect class="cls-7" x="0.5" y="0.5" width="1" height="7"/>
		      </g>
		      <g id="Rectangle_232" data-name="Rectangle 232" class="cls-1" transform="translate(77 514)">
		        <rect class="cls-6" width="2" height="8"/>
		        <rect class="cls-7" x="0.5" y="0.5" width="1" height="7"/>
		      </g>
		    </g>
		    <g id="Group_548" data-name="Group 548" transform="translate(-17.313 -29)">
		      <g id="Group_546" data-name="Group 546" transform="translate(18 1)">
		        <g id="Group_543" data-name="Group 543" transform="translate(35.549)">
		          <g id="Ellipse_48-3" data-name="Ellipse 48" class="cls-1" transform="translate(34 507)">
		            <circle class="cls-6" cx="8" cy="8" r="8"/>
		            <circle class="cls-7" cx="8" cy="8" r="7.5"/>
		          </g>
		        </g>
		        <path id="Path_32" data-name="Path 32" class="cls-3" d="M0-1.678l1.475-3L3-1.678" transform="translate(71.399 512.682) rotate(90)"/>
		        <path id="Path_33" data-name="Path 33" class="cls-3" d="M0-1.678l1.475-3,.386.76L3-1.678" transform="translate(83.7 515.682) rotate(-90)"/>
		        <path id="Path_34" data-name="Path 34" class="cls-3" d="M0,0A10.467,10.467,0,0,0,2.068.252,8.4,8.4,0,0,0,4,0" transform="translate(73.077 511.447) rotate(-19)"/>
		        <g id="Group_545" data-name="Group 545" transform="translate(-6 -9.641)">
		          <g id="Path_29-2" data-name="Path 29" class="cls-2" transform="translate(87.132 531.123) rotate(180)">
		            <path class="cls-6" d="M 3.577645301818848 4.972416400909424 C 2.487495183944702 4.972416400909424 1.454315304756165 4.567626476287842 0.8138853311538696 3.889596462249756 C 0.4178752899169922 3.47032642364502 0.2230453044176102 2.994736433029175 0.250475287437439 2.514246463775635 C 0.2601453065872192 2.344946384429932 0.2619453072547913 2.200536489486694 0.2635352909564972 2.073126554489136 C 0.267305314540863 1.770986437797546 0.2745853066444397 1.64427649974823 0.3323752880096436 1.607406497001648 C 0.4736452996730804 1.517276525497437 0.9737153053283691 1.509726524353027 1.431355357170105 1.509726524353027 C 1.645815253257751 1.509726524353027 1.89330530166626 1.511946439743042 2.179885387420654 1.514516472816467 C 2.579385280609131 1.518096446990967 3.032195329666138 1.522156476974487 3.577645301818848 1.522156476974487 C 3.981705188751221 1.522156476974487 4.34073543548584 1.520606517791748 4.659665107727051 1.519226551055908 C 4.913855075836182 1.518126487731934 5.142505168914795 1.517136454582214 5.348125457763672 1.517136454582214 C 5.938065528869629 1.517136454582214 6.746015071868896 1.517136454582214 6.87638521194458 1.652036547660828 C 6.926835536956787 1.704236507415771 6.92011547088623 1.900816440582275 6.912335395812988 2.12843656539917 C 6.908615112304688 2.237236499786377 6.904405117034912 2.360546588897705 6.904405117034912 2.499996423721313 C 6.904405117034912 3.094306468963623 6.557425498962402 3.707486391067505 5.952445507049561 4.182316303253174 C 5.303285121917725 4.691816329956055 4.459895133972168 4.972416400909424 3.577645301818848 4.972416400909424 Z"/>
		            <path class="cls-8" d="M 1.431355476379395 1.759726524353027 C 1.246633529663086 1.759726524353027 0.7269439697265625 1.759723663330078 0.5220127105712891 1.803117275238037 C 0.5160326957702637 1.874658107757568 0.5146746635437012 1.983558654785156 0.5135154724121094 2.07624626159668 C 0.5119752883911133 2.199836730957031 0.5100550651550293 2.353636503219604 0.5000753402709961 2.528496503829956 C 0.4704952239990234 3.046616554260254 0.7532353401184082 3.461296558380127 0.9956355094909668 3.717926502227783 C 1.580865383148193 4.337516784667969 2.570235252380371 4.722416400909424 3.577645301818848 4.722416400909424 C 5.338605403900146 4.722416400909424 6.654405117034912 3.549086570739746 6.654405117034912 2.499996423721313 C 6.654405117034912 2.356276512145996 6.658695220947266 2.230696678161621 6.662485122680664 2.119896411895752 C 6.665881633758545 2.020414352416992 6.669893264770508 1.90303373336792 6.666389942169189 1.828243255615234 C 6.422667503356934 1.767133712768555 5.708409309387207 1.767136573791504 5.348125457763672 1.767136573791504 C 5.142825126647949 1.767136573791504 4.914535522460938 1.768126487731934 4.660745620727539 1.769226551055908 C 4.34150505065918 1.770606517791748 3.982115268707275 1.772156715393066 3.577645301818848 1.772156715393066 C 3.031075477600098 1.772156715393066 2.577675342559814 1.768086433410645 2.177645206451416 1.764506340026855 C 1.891665458679199 1.761936664581299 1.644695281982422 1.759726524353027 1.431355476379395 1.759726524353027 M 1.431351184844971 1.259731292724609 C 1.940495491027832 1.259731292724609 2.63357400894165 1.272156715393066 3.577645301818848 1.272156715393066 C 7.583775997161865 1.272156715393066 7.154405117034912 1.11928653717041 7.154405117034912 2.499996423721313 C 7.154405117034912 3.880716562271118 5.553035259246826 5.222416400909424 3.577645301818848 5.222416400909424 C 1.602255344390869 5.222416400909424 -0.08198451995849609 3.95159649848938 0.0008854866027832031 2.499996423721313 C 0.06422662734985352 1.390475749969482 -0.2200384140014648 1.259731292724609 1.431351184844971 1.259731292724609 Z"/>
		          </g>
		          <g id="Group_544" data-name="Group 544" transform="translate(125.608 1045.382) rotate(180)">
		            <line id="Line_270-2" data-name="Line 270" class="cls-4" x2="5.872" transform="translate(39.122 517.5)"/>
		          </g>
		        </g>
		        <path id="Path_35" data-name="Path 35" class="cls-3" d="M0,0A10.467,10.467,0,0,0,2.068.252,8.4,8.4,0,0,0,4,0" transform="matrix(0.946, 0.326, -0.326, 0.946, 78.24, 510.145)"/>
		      </g>
		    </g>
		  </g>
		</svg>
	)
}

function CommentSVG({}) {

	return (
		<svg 
			id="comment"
			xmlns="http://www.w3.org/2000/svg" 
			width="19.505" 
			height="18.049" 
			viewBox="0 0 19.505 18.049">
		  <g id="Group_539" data-name="Group 539" transform="translate(-3775.5 -956.953)">
		    <path id="Path_1" data-name="Path 1" class="cls-1" d="M0,0H18.505V11.819H11.434c-1.031,0-7.491,5.23-7.491,5.23l1.217-5.23H0Z" transform="translate(3776 957.453)"/>
		    <line id="Line_213" data-name="Line 213" class="cls-2" x2="11.388" transform="translate(3779.915 961.757)"/>
		    <line id="Line_214" data-name="Line 214" class="cls-2" x2="6.406" transform="translate(3779.915 965.316)"/>
		  </g>
		</svg>
	)
}

function RepostSVG({}) {

	return (
		<svg 
			id="repost"
			xmlns="http://www.w3.org/2000/svg" 
			width="19.319" 
			height="18.766" 
			viewBox="0 0 19.319 18.766">
		  <g id="Group_540" data-name="Group 540" transform="translate(-3760.379 -882.706)">
		    <g id="Group_355" data-name="Group 355" transform="translate(3760.879 883.089)">
		      <path id="Path_2" data-name="Path 2" class="cls-1" d="M8.465,3.8S1.189,3.119-.208,5.264a9.3,9.3,0,0,0,0,8.58c1.4,2.145,5.591,1.37,5.591,1.37" transform="translate(1.257 -0.567)"/>
		      <line id="Line_215" data-name="Line 215" class="cls-2" x2="5.005" transform="translate(6.039 0) rotate(40)"/>
		      <line id="Line_216" data-name="Line 216" class="cls-2" x2="5.005" transform="translate(6.039 6.435) rotate(-40)"/>
		    </g>
		    <g id="Group_356" data-name="Group 356" transform="translate(3769.222 886.354)">
		      <path id="Path_3" data-name="Path 3" class="cls-1" d="M9.555.215S2.446-.747,1.048,1.4a9.3,9.3,0,0,0,0,8.58c1.4,2.145,5.591,1.37,5.591,1.37" transform="translate(9.976 11.484) rotate(-180)"/>
		      <line id="Line_217" data-name="Line 217" class="cls-2" x2="5.005" transform="translate(3.834 8.3) rotate(140)"/>
		      <line id="Line_218" data-name="Line 218" class="cls-2" x2="5.005" transform="translate(4.669 14.735) rotate(-140)"/>
		    </g>
		  </g>
		</svg>
	)
}

function SharedSVG({}) {

	return (
		<svg
			id="shared" 
			xmlns="http://www.w3.org/2000/svg" 
			width="15.558" 
			height="16.307" 
			viewBox="0 0 15.558 16.307">
		  <g id="Group_541" data-name="Group 541" transform="translate(-3296.213 -1983.41) rotate(17)">
		    <path id="Path_4" data-name="Path 4" class="cls-1" d="M5.249,4.731,0,0H13.373" transform="translate(3734.794 937.186) rotate(-30)"/>
		    <path id="Path_5" data-name="Path 5" class="cls-1" d="M5.251,0,0,4.728H13.378" transform="matrix(-0.035, -0.999, 0.999, -0.035, 3742.576, 944.137)"/>
		    <line id="Line_219" data-name="Line 219" class="cls-1" y1="8.151" x2="5.094" transform="translate(3741.627 930.5)"/>
		  </g>
		</svg>
	)
}


export default function Log({data, current, setCurrent, isUnified, updateLog}) {

	const navigate = useNavigate();
	const _id = sessionStorage.getItem('userID');

	let goToProfile = async(userID) => {
		console.log(userID)
		let data = await accessAPI.getSingleUser(userID);
		
		let delay = setTimeout(()=> {
			navigate(`/user/${data.user.username}/${userID}`)
		}, 150)
	}

	let dateObserved, monthObserved;
	function returnPostItem (post, index, userID) {

		let title = post.title,
			tags = 0,
			id = post._id,
			owner = post.owner,
			author = post.author,
			content,
			text = [],
			commentCount;

			if(post.tags) {
				tags = post.tags.length
			}

			if(post.content.find(piece => piece.type == 'text')) {
				content = post.content.find(piece => piece.type == 'text').content
				// content = content.content
			} 

		let month, day, year, dateMatch;

		if(monthObserved != post.postedOn_month) {

			if(dateObserved != post.postedOn_day) {
				month = post.postedOn_month;
				day = post.postedOn_day;
				year = post.postedOn_year;
				dateMatch = false;
			}
		} 
		else if(monthObserved == post.postedOn_month && dateObserved != post.postedOn_day) {
			month = post.postedOn_month;
			day = post.postedOn_day;
			year = post.postedOn_year;
			dateMatch = false;
		}
		dateObserved = post.postedOn_day;
		monthObserved = post.postedOn_month;

		let rightAlign;
		if(isUnified == true && owner == _id) {
			rightAlign = true;
		}

		return (
			<>
				{dateMatch == false  &&
					<span className="postDate">{month + 1} . {day} . {year}</span>
				}

				<div className={`entry ${rightAlign == true ? 'right' : ''}`} id={id} key={post._id}>
					{/*{(userID != post.owner) &&  
						<button className={`toProfile`} onClick={()=> {
							let UID = post.owner._id;
							console.log(UID)
							goToProfile(UID)
						}}>
							<img src={post.profilePhoto}/>
							<span>&#64;{post.author}</span>
						</button>
					}*/}

					{(Object.keys(post).includes('isPinned') &&
						(current.section == 'profile' && post.isPinned == true)) &&
						<h2 id="pinned">PINNED</h2>
					}

					<button className={`toProfile`} onClick={()=> {
							// Below is for older posts which have _id and profile photo in
							// an object
							// let UID = post.owner._id;
							let UID = post.owner;
							console.log(UID)
							goToProfile(UID)
						}}>
							<img src={post.profilePhoto}/>
							<span>&#64;{post.author}</span>
					</button>	

					<div className="textWrapper" onClick={(e)=> {
						e.preventDefault();
						console.log(post)

						setTimeout(()=> {
							navigate(`/post/${post._id}`, {
								state: {post: post}
							});
						}, 600)
					}}>
						<h2>{title}</h2>
						{content &&
							<p>{content}</p>
						}
						
						{post.content.some((data) => data.type == 'media') &&
							<ul id="thumbnailsWrapper" onClick={(e)=> {
								e.stopPropagation();

								let gallery = post.content.filter(data => data.type === 'media')
  									.map(data => ({
    									...data,   // Spread existing properties
    									postID: post._id 
  									}));

								setCurrent({
									...current,
									gallery: gallery
								})
							}}>
								{post.content.filter(data => data.type == 'media').map(data => (
									<li key={data._id}>
										<img loading="lazy" src={data.content} />
									</li>
								))}
							</ul>
						}
						
						<ul id="details">
							<li id="reactions">
								<ReactionsSVG/>
								<span>{post.commentCount}</span>
							</li>
							<li id="comments">
								<CommentSVG/>
								<span>8</span>
							</li>
							<li id="reposts">
								<RepostSVG/>
								<span>1</span>
							</li>
							<li id="shares">
								<SharedSVG/>
								<span>6</span>
							</li>
						</ul>
					</div>
					
				</div>
			</>
		)
	}

	let logRef = React.useRef();
	let logRefC = logRef.current;
	let isMounted = React.useRef(false);

	/* 
		Tracks position of selected post to return to 
	    after viewing it in <Post>
	*/
	React.useEffect(()=> {

		if(data.length && logRefC) {
			console.log(data.length)
			if(current.scrollTo) {

				if(current.monthChart == true) {

					return;
				}
				else if(data.length < 3) {

					return;
				} 
				else {

					let post = Array.from(logRefC.children).filter(el => el.id == current.scrollTo);
					post = post.pop();
					post.scrollIntoView({behavior: "smooth"});
				}
			}			
		}
	}, [data])


	return (
		<div className={"log"} ref={logRef}>
			{(data && data.length > 0) &&
				data.map((post, index) => returnPostItem(post, index, _id))
			}
		</div>
	)

}