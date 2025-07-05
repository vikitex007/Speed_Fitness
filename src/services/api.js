const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  }

  // Authentication APIs
  async register(userData) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await this.handleResponse(response);

    // Store token if registration is successful
    if (data.success && data.data.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await this.handleResponse(response);

    // Store token if login is successful
    if (data.success && data.data.token) {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  async getProfile() {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    return await this.handleResponse(response);
  }

  async updateProfile(profileData) {
    console.log("Updating profile with data:", profileData);
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    const data = await this.handleResponse(response);
    console.log("Profile update response:", data);

    // Update stored user data if successful
    if (data.success && data.data.user) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  async changePassword(passwordData) {
    console.log("Changing password with data:", {
      ...passwordData,
      newPassword: "[HIDDEN]",
    });
    const response = await fetch(`${this.baseURL}/auth/change-password`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(passwordData),
    });

    const data = await this.handleResponse(response);
    console.log("Password change response:", data);
    return data;
  }

  // Premium Membership APIs
  async getPremiumFeatures() {
    const response = await fetch(`${this.baseURL}/auth/premium-features`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });

    const data = await this.handleResponse(response);

    // Update stored user data if successful
    if (data.success && data.data) {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          membershipStatus: data.data.membershipStatus,
          subscriptionDetails: data.data.subscriptionDetails,
          premiumFeatures: data.data.premiumFeatures,
          fitnessProfile: data.data.fitnessProfile,
          activityStats: data.data.activityStats,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }

    return data;
  }

  async upgradeMembership(membershipData) {
    const response = await fetch(`${this.baseURL}/auth/upgrade-membership`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(membershipData),
    });

    const data = await this.handleResponse(response);

    // Update stored user data if successful
    if (data.success && data.data.user) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  async cancelMembership() {
    const response = await fetch(`${this.baseURL}/auth/cancel-membership`, {
      method: "POST",
      headers: this.getAuthHeaders(),
    });

    const data = await this.handleResponse(response);

    // Update stored user data if successful
    if (data.success && data.data.user) {
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  }

  async updateFitnessProfile(fitnessData) {
    const response = await fetch(`${this.baseURL}/auth/fitness-profile`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(fitnessData),
    });

    const data = await this.handleResponse(response);

    // Update stored user data if successful
    if (data.success && data.data.fitnessProfile) {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          fitnessProfile: data.data.fitnessProfile,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }

    return data;
  }

  async recordWorkout(workoutData) {
    const response = await fetch(`${this.baseURL}/auth/record-workout`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(workoutData),
    });

    const data = await this.handleResponse(response);

    // Update stored user data if successful
    if (data.success && data.data.activityStats) {
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          activityStats: data.data.activityStats,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    }

    return data;
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    return await this.handleResponse(response);
  }

  // Logout (client-side)
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Check if user is premium
  isPremiumUser() {
    const user = this.getCurrentUser();
    return (
      user &&
      user.membershipStatus &&
      user.membershipStatus !== "free" &&
      user.subscriptionDetails?.isActive
    );
  }

  // Get user's premium features
  getPremiumFeatures() {
    const user = this.getCurrentUser();
    if (!user || !this.isPremiumUser()) {
      return {
        personalTrainer: false,
        nutritionConsultation: false,
        groupClasses: false,
        recoverySessions: false,
        priorityBooking: false,
        guestPasses: 0,
        towelService: false,
        lockerAccess: true,
        parkingAccess: true,
      };
    }
    return user.premiumFeatures || {};
  }

  // Get user's membership status
  getMembershipStatus() {
    const user = this.getCurrentUser();
    return user ? user.membershipStatus : "free";
  }

  // Get token
  getToken() {
    return localStorage.getItem("token");
  }

  async getAllUsers() {
    const response = await fetch(`${this.baseURL}/users`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });
    return await this.handleResponse(response);
  }

  async getPremiumUsers() {
    const response = await fetch(`${this.baseURL}/users/premium`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    });
    return await this.handleResponse(response);
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
