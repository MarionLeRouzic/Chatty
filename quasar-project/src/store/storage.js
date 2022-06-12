import { firebaseAuth, firebaseDb } from "../boot/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"
import { ref, set, onValue, update, onChildAdded, onChildChanged, off, push } from "firebase/database"

let messageRef

const state = {
  userDetails: {},
  users: {},
  messages: {}
}

const mutations = {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    //Vue.set(state.users, payload.userId, payload.userDetails)
    //this.set(state.users, payload.userId, payload.userDetails)
    //state.users = payload
    state.users[payload.userId] = payload.userDetails
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
  addMessage(state, payload) {
    state.messages[payload.messageId] = payload.messageDetails
  },
  clearMessages(state){
    state.messages = {}
  }
}

const actions = {
  registerUser({}, payload) {
    console.log("Register user, payload: ", payload)
    createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
      .then(response => {
        console.log(response)
        let userId = firebaseAuth.currentUser.uid
        set(ref(firebaseDb, 'users/' + userId), {
          name: payload.name,
          email: payload.email,
          online: true
        })
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  loginUser({}, payload) {
    console.log("Login User")
    signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  logoutUser() {
    signOut(firebaseAuth)
  },
  handleAuthStateChanged({ commit, dispatch, state }) {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid
        onValue(ref(firebaseDb, 'users/' + userId), (snapshot) => {
          let userDetails = (snapshot.val())
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        dispatch('firebaseUpdateUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
        this.$router.push('/')
      }
      else {
        dispatch('firebaseUpdateUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth')
      }
    })
  },

  firebaseUpdateUser({}, payload) {
    update(ref(firebaseDb, 'users/' + payload.userId), payload.updates)
  },

  firebaseGetUsers({ commit }) {
    onChildAdded(ref(firebaseDb,'users'), snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails
      })
    })
    onChildChanged(ref(firebaseDb,'users'), snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('updateUser', {
        userId,
        userDetails
      })
    })
  },
  firebaseGetMessages({ commit, state }, otherUserId) {
    let userId = state.userDetails.userId
    messageRef = ref(firebaseDb, 'chats/' + userId + '/' + otherUserId)
    onChildAdded(messageRef, snapshot => {
      let messageDetails = snapshot.val()
      let messageId = snapshot.key
      commit('addMessage', {
        messageId,
        messageDetails
      })
    })
  },
  firebaseStopGettingMessages({ commit }) {
    console.log('messageRef stop: ', messageRef)
    if (messageRef) {
      off(messageRef)
      commit('clearMessages')
    }
  },
  firebaseSendMessage({}, payload) {
    console.log('payload send message:', payload)
    push(ref(firebaseDb, 'chats/' + state.userDetails.userId + '/' + payload.otherUserId), payload.message)
    payload.message.from = 'them'
    push(ref(firebaseDb, 'chats/' + payload.otherUserId + '/' + state.userDetails.userId), payload.message)

  }
}

const getters = {
  users: state => {
    let usersFiltered = {}
    Object.keys(state.users).forEach(key => {
      if (key !== state.userDetails.userId) {
        usersFiltered[key] = state.users[key]
      }
    })
    return usersFiltered
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
