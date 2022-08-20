import random
from sys import exit

suits = ('Hearts', 'Diamonds', 'Spades', 'Clubs')
ranks = ('Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace')
values = {'Two':2, 'Three':3, 'Four':4, 'Five':5, 'Six':6, 'Seven':7, 'Eight':8, 'Nine':9, 'Ten':10, 'Jack':10,
         'Queen':10, 'King':10, 'Ace':11}
playing=True

##make card class
class Card:
    
    def __init__(self,suit,rank):
        self.suit=suit
        self.rank=rank
        self.value=values[rank]
    
    def __str__(self):
        return (f'{self.rank} of {self.suit}')
##make deck class
class Deck:
    
    def __init__(self):
        self.deck = []  # start with an empty list
        for suit in suits:
            for rank in ranks:
                card_obj=Card(suit,rank)
                self.deck.append(card_obj)
    
    def __str__(self):
        return f"{self.deck[0]}, {self.deck[-1]}"

    def shuffle(self):
        random.shuffle(self.deck)
        
    def deal(self):
        new_card=self.deck.pop()
        return new_card

##make player or computer hand class
class Hand:
    def __init__(self):
        self.cards = []  # start with an empty list as we did in the Deck class
        self.value = 0   # start with zero value
        self.aces = 0    # add an attribute to keep track of aces
    
    def add_card(self,card):
        self.cards.append(card)
        self.value+= card.value
        if card.rank == 'Ace':
            self.aces += 1
    
    def adjust_for_ace(self):
        while self.value > 21 and self.aces:
            self.value -= 10
            self.aces -= 1 

##make a chips class
class Chips:
    
    def __init__(self):
        self.total = 100  # This can be set to a default value or supplied by a user input
        self.bet = 0
        
    def win_bet(self):
        self.total+=self.bet
    
    def lose_bet(self):
        self.total-=self.bet

#function to bet
def take_bet(chips):
    while True:
        try:
            chips.bet=int(input("Please place how much you would like to bet: "))
            if chips.bet>chips.total:
                print("You can not bet more chips than you have")
            else:
                print(f"You have bet ${chips.bet}")
                return chips.bet
        except:
            print("Invalid input. Please place bet as a number")

#function to hit for another ccard
def hit(deck,hand):
    hand.add_card(deck.deal())
    hand.adjust_for_ace()

#function in game asking if hit or stand
def hit_or_stand(deck,hand): 
    global playing
    while True:
        prompt=input("Would you like to hit or stand? ").lower()
        if prompt=='hit':
            hit(deck,hand)
            for card in hand.cards:
                print(card)
            print(f'Value of your hand is now {hand.value}')
            if hand.value>21:
                playing=False
                break
        elif prompt =='stand':
            playing=False
            break
        else:
            print("Answer either, hit or stand")

#function to show cards during game
def show_some(player,dealer):
    print('-----Your cards are-----')
    for card in player.cards:
        print(card)
    print(f'The value of your hand is: {player.value}')
    print("-----The dealers hand is-----")
    print("Hidden card,",dealer.cards[1])
    
def show_all(player,dealer):
    print('\n'*10)
    print('-----Your cards are-----')
    for card in player.cards:
          print(card)
    print(f'Your final value was: {player.value}')
    print('-----Dealers hand is-----')
    for card in dealer.cards:
        print(card)
    print(f'Dealers final value was: {dealer.value}')

#function to show end of game scenarios
def player_busts(player,dealer,chips):
    print('\n'*5)
    print("Player busts, dealer wins!")
    chips.lose_bet()

def player_wins(player,dealer,chips):
    print('\n'*5)
    print('Player wins round!')
    chips.win_bet

def dealer_busts(player,dealer,chips):
    print('\n'*5)
    print("Dealer busts, you win!")
    chips.win_bet()
    
def dealer_wins(player,dealer,chips):
    print('\n'*5)
    print("Dealer wins!")
    chips.lose_bet()
    
def push(player,dealer):
    print('\n'*5)
    print("Player and dealer tied")

#function for the actual game
def blackjack():
    #Create chips that won't reset with playing game over again
    print("Welcome to Blackjack!")
    player_chips=Chips()
    global playing
    
    #create deck, hand, and computer hand that resets each round
    while True:
        new_deck=Deck()
        new_deck.shuffle()
        name=Hand()
        dealer=Hand()
        print(f'Your chip total is {player_chips.total}')
        #reset
        for i in range(2):
            name.add_card(new_deck.deal())
            dealer.add_card(new_deck.deal())
            
        # Prompt the Player for their bet
        take_bet(player_chips)


        # Show cards (but keep one dealer card hidden)
        show_some(name,dealer)


        while playing: 

            # Prompt for Player to Hit or Stand
            hit_or_stand(new_deck,name)

            # Show cards (but keep one dealer card hidden)
            show_some(name,dealer)

            # If player's hand exceeds 21, run player_busts() and break out of loop
            if name.value>21:
                player_busts(name,dealer,player_chips)
                break
        # If Player hasn't busted, play Dealer's hand until Dealer reaches 17
        if name.value<=21:
            while dealer.value<17:
                hit(new_deck,dealer)

                # Show all cards
                show_all(name,dealer)
                # Run different winning scenario
                if name.value< dealer.value and dealer.value<=21:
                    dealer_wins(name,dealer,player_chips)
                elif name.value<=21 and dealer.value>21:
                    dealer_busts(name,dealer,player_chips)  
                elif name.value<=21 and name.value>dealer.value:
                    player_wins(name,dealer,player_chips)
                elif name.value == dealer.value:
                    push(name,dealer)

        # Inform Player of their chips total 
        print(f'Your chip total is now: {player_chips.total}')
        if player_chips.total==0:
            print('Sorry you are out of money')
            playing=True #reset while loop
            break
        # Ask to play again
        while True:
            play_again=input('Would you like to play again? (Y or N)').upper()
            if play_again=='N': ###need to make a loop that doesn't accept anything other than y or no
                playing=True
                exit()
            elif play_again=='Y':
                playing=True
                break
            else:
                print('Must answer Y or N')
            

blackjack()