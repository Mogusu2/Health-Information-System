import sys
import os
from logging.config import fileConfig
from alembic import context
from sqlalchemy import create_engine, pool
from dotenv import load_dotenv


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'app', 'models')))

load_dotenv()


config = context.config
if config.config_file_name is not None:
	fileConfig(config.config_file_name)


from app.models.models import Client, Program 

from app.database import Base 

target_metadata = Base.metadata

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
	raise ValueError("DATABASE_URL environment variable is not set")

def run_migrations_offline() -> None:
	"""Run migrations in 'offline' mode."""
	context.configure(
		url=DATABASE_URL,
		target_metadata=target_metadata,
		literal_binds=True,
		dialect_opts={"paramstyle": "named"},
	)
	with context.begin_transaction():
		context.run_migrations()

def run_migrations_online() -> None:
	"""Run migrations in 'online' mode."""
	connectable = create_engine(
		DATABASE_URL,
		poolclass=pool.NullPool,
	)
	with connectable.connect() as connection:
		context.configure(
			connection=connection,
			target_metadata=target_metadata
		)
		with context.begin_transaction():
			context.run_migrations()

if context.is_offline_mode():
	run_migrations_offline()
else:
	run_migrations_online()

