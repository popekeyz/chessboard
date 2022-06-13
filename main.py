import random
while True:
 choices = ["R", "P", "S"]

 computer = random.choices(choices)
player = None

while player not in choices:
    player =input("R, P, or S?: ").lower()

if player == computer:
  print("computer: ", computer)
  print("player: ",player)
  print("Tie!")
elif player == "R":
    if computer == "P":
        print("computer: ", computer)
        print("player: ",player)
        print("You Lose!")
    if computer == "S":
       print("computer: ", computer)
       print("player: ",  player)
       print("You win!")

    elif player == "S":
     if computer == "R":
        print("computer: ", computer)
        print("player: ",player)
        print("You Lose!")
    if computer == "P":
      print("computer: ", computer)
      print("player: ",player)
      print("You win!")

    elif player == "P":
     if computer == "S":
        print("computer: ", computer)
        print("player: ",player)
        print("You Lose!")
     if computer == "R":  
        print("computer: ", computer)
        print("player: ",player)
        print("You win!")

    play_again =input("Play again (yes/no): ").lower()
    if play_again!= "yes":
        "break"
    print("Bye!")