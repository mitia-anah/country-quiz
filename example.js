Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore

@mitia-anah
nisargp08
    /
    DC - P2 - FE - Quiz
1
0
0
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
DC - P2 - FE - Quiz / src / App.vue
@nisargp08
nisargp08 Finish 🚀
Latest commit 582bd5f on Oct 6
History
1 contributor
202 lines(196 sloc)  9.17 KB

    < template >
    <div id="app">
        <div class="bg-background-primary transition-all-25-ease-in" :class="currentTheme">
        <div class="flex flex-col min-h-screen font-poppins font-medium text-tc-primary p-4 lg:max-w-screen-xl lg:mx-auto lg:p-12">
            <header>
                <!-- Theme Switcher icons with functionality -->
                <app-theme-switcher></app-theme-switcher>
            </header>
            <main class="flex flex-col flex-1 items-center justify-center">
                <div>
                    <!-- text-4xl larger viewport -->
                    <h1 class="font-bold text-2xl uppercase">Country quiz</h1>
                    <div class="flex flex-col bg-white mt-3 rounded-24px">
                        <template v-if="errored"><div class="px-8 py-6 text-black">{{ errorMsg }}</div></template>
                        <!-- Display loader when api fetch in progress -->
                        <template v-if="loading">
                            <div class="flex flex-col items-center justify-center px-8 py-6">
                                <svg class="w-16 h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" preserveAspectRatio="xMidYMid" display="block">
                                    <path fill="none" stroke="#6066d0" stroke-width="6.4" stroke-dasharray="42.76482137044271 42.76482137044271" d="M19.44 24C9.12 24 4 34.64 4 40s5.12 16 15.44 16c15.44 0 25.68-32 41.12-32C70.88 24 76 34.64 76 40s-5.12 16-15.44 16c-15.44 0-25.68-32-41.12-32z" stroke-linecap="round" style="transform-origin:50px 50px">
                                        <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625" />
                                    </path>
                                </svg>
                                <p class="text-tc-ternary">Loading...</p>
                            </div>
                        </template>
                        <!-- When api is done loading and quiz in progress then question -->
                        <template v-if="done && quizInProgress">
                            <div class="text-right -mt-12">
                                <img class="ml-auto w-32" src="@/assets/images/globe.svg" alt="Country quiz">
                            </div>
                                <div class="px-8 py-6">
                                    <div v-for="(question,index) in questions" :key="index">
                                    <!-- Show question equal to the currentStep -->
                                    <app-question-card v-if="index == currentStep" @nextQuestion="nextQuestion" :question="question"></app-question-card>
                            </div>
                            </div>
                        </template>
                    <!-- When quiz is finished show results -->
                        <template v-if="done && !quizInProgress">
                        <div class="px-8 py-6 text-center">
                            <div class="text-right">
                                <img class="ml-auto" src="@/assets/images/winner.svg" alt="Country quiz">
                                </div>
                                <h2 class="font-bold text-4xl text-dark-blue mt-8">Results</h2>
                                <p class="font-normal text-base text-dark-blue">You got <span class="font-bold text-light-green text-3xl">{{ quizScore }}</span> correct answers</p>
                                <button @click="setupQuiz()" class="font-bold text-lg text-dark-blue mt-8 py-4 px-12 rounded-12px border border-2 border-dark-blue hover:bg-dark-blue hover:text-white focus:outline-none">Try again</button>
                        </div>
                    </template>
                </div>
                </div>
            </main>
        <footer class="text-center my-8">
            <p class="font-montserrat text-sm font-bold leading-4 text-gray-100">Nisarg Patel @ DevChallenges.io</p>
        </footer>
    </div>
    </div >
</div >
</template >

<script>
        import { mapState } from 'vuex';
import { CountryMixin } from '@/mixins/countryApi.js';
import { helperFunctions } from '@/mixins/helperFunctions.js';
export default {
    name: 'App',
    mixins: [CountryMixin, helperFunctions],
    data() {
        return {
            //Quiz total questions
            quizQuestions: 5,
            //Score
            quizScore: 0,
            //Current step
            currentStep: 0,
            //Country information
            countryData: [],
            //Questions 
            questions: [],
            //Quiz tracking variables
            quizInProgress: false,
        }
    },
    async created() {
        await this.setupQuiz();
    },
    components: {
        'AppThemeSwitcher': () => import('@/components/ThemeSwitcher.vue'),
        // 'AppButton': () => import('@/components/Button.vue'),
        'AppQuestionCard': () => import('@/components/QuestionCard.vue'),
    },
    computed: {
        ...mapState(['currentTheme']),
    },
    methods: {
        generateQuestion(totalQuestions) {
            //Local questions array
            let questions = [];
            // Untill we do not have questions equal to totalQustions
            while (questions.length < totalQuestions) {
                //To pick a random Country
                let randomCountryIndex = this.generateRandomNumber(0, this.countryData.length);
                let randomCountry = this.countryData[randomCountryIndex];
                //Random options storage for our question
                let randomOptions = [];
                //While we dont we have 3 options keep iterating
                while (randomOptions.length < 3) {
                    let option = this.generateRandomNumber(0, this.countryData.length);
                    //So that we do not get the index of our question(Since we already have the answer)
                    if (option != randomCountryIndex) {
                        //Pushing a random option to the array
                        let optionObj = {
                            value: this.countryData[option].name,
                            isCorrect: false,
                        }
                        randomOptions.push(optionObj);
                    }
                }
                if (randomCountry.name != "") {
                    //Pushing the correct answer to the option list
                    const option = {
                        value: randomCountry.name,
                        isCorrect: true,
                    }
                    randomOptions.push(option);
                } else {
                    //When no answer is found : As observed in the api
                    const option = {
                        value: "None of the above",
                        isCorrect: true,
                    }
                    randomOptions.push(option);
                }
                
                //Alternate question between capital and flag
                let questionTitle = "";
                let questionType = "";
                if(questions.length % 2 == 0){
                    // Generate 'flag' question for every even question
                    questionTitle = randomCountry.flag;
                    questionType = "flag";
                } else {
                    //Generate 'Capital' question for every odd questions
                    questionTitle = randomCountry.capital;
                    questionType = "capital";
                }
                //Preparing our question object
                const question = {
                    title: questionTitle,
                    //Type of question : Capital or Flag
                    type : questionType,
                    //Shuffle Options before storing them
                    options: this.shuffle(randomOptions)
                }
                //Pushing prepared question to the array
                questions.push(question);
            }
            //Assigning questions 
            return questions;
        },
        nextQuestion(score) {
            //Add score if correct
            if (score > 0) {
                this.quizScore += score;
                if (this.currentStep < this.quizQuestions) {
                    this.currentStep++;
                }
                //All questions answers and quiz is concluded
                if (this.currentStep == this.quizQuestions) {
                    this.quizInProgress = false;
                }
            }
            else {
                //User answered wrong - terminate quiz
                this.quizInProgress = false;
            }
        },
        async setupQuiz() {
            //Score
            this.quizScore = this.currentStep = 0;
            //Generate question data and assign to proper variables
            //Function called from mixin
            this.countryData = await this.fetchCountryData();
            this.questions = this.generateQuestion(this.quizQuestions);
            //Start quiz
            this.quizInProgress = true;
        },
    }
}
</script>

<style lang="scss">
        #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.light-theme{
    background: url('~@/assets/images/background.png') no-repeat center;
}
</style>
