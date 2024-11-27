## Iteration 6: Refactoring `loginUser` Controller

### Purpose
This iteration focuses on analyzing and refactoring the `loginUser` controller to improve maintainability and adhere to best practices. Specifically, it addresses where authentication logic should reside and explores the role of static methods in the `User` model.

---

### Comparison of Current Implementation vs. Refactored Version

#### 1. Purpose of `userSchema.statics.login` in `userModel.js`
- The static `login` method encapsulates the authentication logic directly in the model.
- Benefits:
  - Reusability: Can be used across multiple controllers or services.
  - Testability: Easier to test the model methods independently.
  - Separation of Concerns: Keeps controllers focused on handling requests and responses.

---

#### 2. `User.findOne({ email })` vs. `this.findOne({ email })`
- **`User.findOne({ email })`:**
  - Explicitly calls the model's `findOne` method in the controller.
  - Typical for external logic interacting with the model.

- **`this.findOne({ email })`:**
  - Refers to the current model within the context of a schema's static or instance method.
  - Used for defining reusable model-specific logic.

- **When to Use `this`:**
  - Inside the schema when defining static or instance methods.
  - Ensures flexibility by abstracting the model's name.

- **When to Use the Model Name:**
  - In external files like controllers to interact with the model directly.

---

#### 3. Why `bcrypt` is Imported in `userController.js` and Not in `userModel.js`
- **Current Approach:**
  - `bcrypt` is used in the controller to manage authentication workflows.
  - Logic for password comparison (`bcrypt.compare`) is kept in the controller, allowing flexibility.
  
- **Alternative Approach:**
  - Move password comparison into a static method in the `User` model for consistency and reusability.

---

### Preferred Approach for Our Project
- **Chosen Methodology:**
  - Define a static method, `userSchema.statics.login`, within the `User` model to handle authentication logic.
  - Controllers should delegate credential validation and business logic to the model.

- **Reasoning:**
  - Promotes code reuse and keeps the controller lightweight.
  - Enhances testability of the login logic.

---

### Conclusion
The refactored approach will move the core logic for logging in users to a static method in the `User` model. This improves maintainability by centralizing authentication workflows and adhering to separation of concerns. The `loginUser` controller will handle only request validation, response creation, and token generation.

All changes are documented to ensure team alignment and consistency.


## Iteration 7: Refactoring `signupUser` Controller

### Purpose
This iteration focuses on analyzing and refactoring the `signupUser` controller to ensure that user registration logic adheres to best practices. It explores how static methods in the `User` model can improve maintainability and code organization.

---

### Comparison of Current Implementation vs. Refactored Version

#### 1. Purpose of `userSchema.statics.signup` in `userModel.js`
- The static `signup` method encapsulates the user registration logic directly in the model.
- Benefits:
  - Centralized Logic: Keeps validation, password hashing, and user creation in one place.
  - Reusability: The `signup` logic can be reused across controllers or services.
  - Testability: Easier to test user registration independently from controller logic.

---

#### 2. `User.create({ email, password: hash })` vs. `this.create({ email, password: hash })`
- **`User.create({ email, password: hash })`:**
  - Explicitly calls the model's `create` method in the controller.
  - Commonly used in external files interacting with the model.

- **`this.create({ email, password: hash })`:**
  - Refers to the current model context when used inside a schema's static or instance method.
  - Preferred within model-specific logic to maintain context.

- **When to Use `this`:**
  - Inside the schema to define reusable model-specific methods.
  
- **When to Use the Model Name:**
  - In controllers or external logic to interact with the model directly.

---

#### 3. Why `validator` is Imported in `userController.js` and Not in `userModel.js`
- **Current Approach:**
  - Validation logic is kept in the controller, allowing flexibility for changing validation rules specific to incoming requests.
  
- **Alternative Approach:**
  - Move validation to the `User` model to centralize logic and enforce consistent validation rules across the application.

---

### Preferred Approach for Our Project
- **Chosen Methodology:**
  - Define a static method, `userSchema.statics.signup`, within the `User` model to handle user registration logic.
  - The `signup` method will include:
    - Validation of required fields.
    - Email and password checks (e.g., valid email format, strong password).
    - Password hashing and user creation.

- **Reasoning:**
  - Improves maintainability by consolidating logic in the model.
  - Simplifies the controller, focusing it on request handling and response creation.

---

### Conclusion
The refactored approach will centralize the user registration logic in a `signup` static method within the `User` model. This ensures consistency, reduces duplication, and adheres to separation of concerns. The `signupUser` controller will handle request validation, response generation, and token creation, delegating all business logic to the model.

All changes have been documented to ensure clarity and team alignment.
