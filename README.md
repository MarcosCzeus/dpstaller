Authentication 

Register :

firebase.auth().createUserWithEmailAndPassword(email, password)

Log In	:

firebase.auth().signInWithEmailAndPassword(email, password)

Log Out :

firebase.auth().signOut()

HTTP Method

CRUD

C = Create:

firebase.firestore().collection('nama collection').add({field: field,})

R = Read:

firebase.firestore().collection('nama collection').onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((documentSnapshot) => {
            return { ...documentSnapshot.data(), id: documentSnapshot.id };
          });

U = Update:

firebase.firestore().collection('nama collection').doc(id).update({ field });
firebase.firestore().collection('Jadwal').doc(jadwal.id).update({
        hari,
        jam,
        mataKuliah,
      })

D = Delete:

firebase.firestore().collection('nama collection').doc(id).delete();

You Tube : https://youtu.be/HYMDMwmBsww


