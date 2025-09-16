import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Register a new user
export const registerUser = async (userData) => {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.workEmail,
            userData.password
        );

        const user = userCredential.user;

        // Update user profile
        await updateProfile(user, {
            displayName: userData.companyName
        });

        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: userData.workEmail,
            companyName: userData.companyName,
            position: userData.position,
            contactNumber: userData.contactNumber,
            createdAt: new Date(),
            isVerified: false // Admin can verify later
        });

        return {
            success: true,
            user: user,
            message: 'Account created successfully!'
        };

    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Login user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.exists() ? userDoc.data() : null;

        return {
            success: true,
            user: user,
            userData: userData,
            message: 'Login successful!'
        };

    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Logout user
export const logoutUser = async () => {
    try {
        await signOut(auth);
        return {
            success: true,
            message: 'Logged out successfully!'
        };
    } catch (error) {
        console.error('Logout error:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Get current user data
export const getCurrentUserData = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return {
                success: true,
                userData: userDoc.data()
            };
        } else {
            return {
                success: false,
                error: 'User data not found'
            };
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return {
            success: false,
            error: error.message
        };
    }
};