import random

##display tic tac toe board
def display_board(board):
    print('\n'*50)
    print(board[1]+'|'+board[2]+'|'+board[3])
    print('-|-|-')
    print(board[4]+'|'+board[5]+'|'+board[6])
    print('-|-|-')
    print(board[7]+'|'+board[8]+'|'+board[9])

#player selection
def player_input():
    marker=''
    while marker not in ['X','Y']:
        marker=input('Player 1. Would you like to be X or Y? ').upper()
        if marker not in ['X','Y']:
            print("I'm sorry that is not an X or Y")
    if marker in ['X','Y'] and marker=='X':
        return ('X','Y')
    elif marker in ['X','Y'] and marker =='Y':
        return ('Y','X')
#gameplay functions
def place_marker(board, marker, position):
    board[position]=marker

def win_check(board, mark):
    return ((board[1]==mark and board[2]==mark and board[3]==mark) or
           (board[4]==mark and board[5]==mark and board[6]==mark) or
           (board[7]==mark and board[8]==mark and board[9]==mark) or
            (board[1]==mark and board[5]==mark and board[9]==mark) or
            (board[3]==mark and board[5]==mark and board[7]==mark) or
            (board[1]==mark and board[4]==mark and board[7]==mark) or
            (board[2]==mark and board[5]==mark and board[8]==mark) or
            (board[3]==mark and board[6]==mark and board[9]==mark))

def choose_first():
    turn=random.randint(1,2)
    if turn==1:
        return 'Player 1'
    else:
        return 'Player 2'

def space_check(board, position):
    return board[position]==' '

def full_board_check(board):
    for i in range(9):
        if board[i]==' ':
            return False
    return True

def player_choice(board):
    x=True
    while x==True:
        try:
            posChoice=int(input('''What position would you to play at?
(1|2|3
 -----
4|5|6
 -----
7|8|9)'''))
            if space_check(board,posChoice)==False:
                print('That position is already filled, try again.')
            else:
                return posChoice
        except:
            print('Sorry not a valid position!!! Please pick a position (1-9)')

def replay():
    replayChoice=True
    while replayChoice==True:
        answer=input('Would you like to keep playing? (Y or N)').upper()
        try:
            if answer=='Y':
                return True
            elif answer=='N':
                replayChoice=False
                return False
            else:
                print('Invalid response. Please enter Y or N')
        except:
            print('Error')

#game logic
def TicTac():
    print('Welcome to Tic Tac Toe!')

    while True:
        theBoard=[' ']*10
        player1mark, player2mark = player_input()
        turn=choose_first()
        print(turn,'will go first!')
    
        readyCheck=True
        while readyCheck==True:
    
            play=input('Are you ready to play the game? (yes or no)').lower()
            if play[0]=='y':
                game_on=True
                readyCheck=False
            elif play[0]=='n':
                game_on=False
                readyCheck=False
                break
            else:
                print('Invalid response, please enter yes or no')
        while game_on:
            turn=='Player 1'
            print("Player 1's turn")
            posChoice=player_choice(theBoard)
            place_marker(theBoard,player1mark,posChoice)
            display_board(theBoard)
            
        
            if win_check(theBoard, player1mark)==True:
                display_board(theBoard)
                print('Congrats Player 1 won!')
                break
            else:
                if full_board_check==True:
                    display_board(theBoard)
                    print("It's a draw!")
                    break
                else:
                    turn='Player 2'
                
        
        
        
        # Player2's turn.
            turn=='Player 2'
            print("Player 2's turn")
            posChoice=player_choice(theBoard)
            place_marker(theBoard,player2mark,posChoice)
            display_board(theBoard)
            
        
            if win_check(theBoard, player2mark)==True:
                    display_board(theBoard)
                    print('Congrats Player 2 won!')
                    break
            else:
                if full_board_check==True:
                    display_board(theBoard)
                    print("It's a draw!")
                    break
                else:
                    turn='Player 1'
                

        if not replay():
            break

TicTac()