from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

# Define models for teams, activities, leaderboard, and workouts
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField()
    team = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users (super heroes)
        users = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': marvel.name},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'team': marvel.name},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': dc.name},
            {'username': 'superman', 'email': 'superman@dc.com', 'team': dc.name},
        ]
        for u in users:
            User.objects.create_user(username=u['username'], email=u['email'], password='password')

        # Create activities
        Activity.objects.create(user='ironman', activity_type='Running', duration=30, team=marvel.name)
        Activity.objects.create(user='batman', activity_type='Cycling', duration=45, team=dc.name)
        Activity.objects.create(user='superman', activity_type='Swimming', duration=60, team=dc.name)
        Activity.objects.create(user='captainamerica', activity_type='Walking', duration=20, team=marvel.name)

        # Create leaderboard
        Leaderboard.objects.create(team=marvel.name, points=50)
        Leaderboard.objects.create(team=dc.name, points=70)

        # Create workouts
        Workout.objects.create(name='Pushups', description='Do 20 pushups', difficulty='Easy')
        Workout.objects.create(name='Plank', description='Hold plank for 1 min', difficulty='Medium')
        Workout.objects.create(name='Burpees', description='Do 10 burpees', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
