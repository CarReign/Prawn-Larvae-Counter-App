
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/services.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class SignIn extends StatefulWidget {
  const SignIn({super.key});

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  Future<void> signInWithGoogle(BuildContext context) async {
    // Push the route to the waiting screen
    Navigator.of(context).push(MaterialPageRoute(builder: (context) => const WaitingScreen()));
    // Trigger the authentication flow
    final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
    // Obtain the auth details from the request
    final GoogleSignInAuthentication? googleAuth = await googleUser?.authentication;
    // Create a new credential
    final credential = GoogleAuthProvider.credential(
      accessToken: googleAuth?.accessToken,
      idToken: googleAuth?.idToken,
    );

    if (context.mounted) {
      // Pop the waiting screen
      Navigator.of(context).pop();
      String? userId = FirebaseAuth.instance.currentUser?.uid;
      if (userId == null) {
        await displayError(context, 'Google Sign In Failed');
      } else {
        Navigator.of(context).pushReplacementNamed('/homepage');
      }
    }
  }

  Future<void> signInWithEmailAndPassword(BuildContext context) async {
    // Push the route to the waiting screen
    Navigator.of(context).push(MaterialPageRoute(builder: (context) => const WaitingScreen()));
    UserCredential userCredential = await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: emailController.text,
        password: passwordController.text
    );
    // check if signed in
    if (context.mounted) {
      // Pop the waiting screen
      Navigator.of(context).pop();
      String? userId = FirebaseAuth.instance.currentUser?.uid;
      if (userId == null) {
        await displayError(context, 'Sign in failed');
      } else {
        Navigator.of(context).pushReplacementNamed('/homepage');
      }
    }
  }

  Future<void> displayError(BuildContext context, String message) async {
    // Pop the waiting screen
    if(context.mounted){
      Navigator.of(context).pop();
    }
    // show error message
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // email and password
            TextField(
              controller: emailController,
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Email',
              ),
            ),
            const SizedBox(height: 10),
            TextField(
              controller: passwordController,
              obscureText: true,
              obscuringCharacter: '💙', //heart character
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'Password',
              ),
            ),
            const SizedBox(height: 10),
            ElevatedButton(
                onPressed: () async {
                  try {
                    await signInWithEmailAndPassword(context);
                  } on PlatformException catch (e) {
                    print(e.message);
                  }
                },
                child: const Text('Sign In')
            ),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () async {
                try {
                  await signInWithGoogle(context);
                } on PlatformException catch (e) {
                  print(e.message);
                }
              },
              child: const Text('Sign in with Google'),
            ),
          ],
        ),
      ),
    );
  }
}

class WaitingScreen extends StatelessWidget {
  const WaitingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Column(
          children: <Widget> [
            CircularProgressIndicator(),
            SizedBox(height: 20),
            Text('Google - Signing In'),
          ],
        )
      ),
    );
  }
}

