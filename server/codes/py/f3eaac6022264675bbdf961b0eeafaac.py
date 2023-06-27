# Get user input
input_str = input("Enter two numbers separated by a space: ")
num1, num2 = map(float, input_str.split())

# Perform calculation
result = num1 + num2

# Display result
print("The sum of", num1, "and", num2, "is", result)
