# pylint: disable=E0401
"""Gets the current time"""
from datetime import datetime
import pytz


def get_time(timezone: str = "US/Eastern") -> str:
    """
    Sets the timezone and returns a formatted timestamp of the current time.

    Args:
        timezone (str, optional): The timezone. Defaults to "US/Eastern".

    Returns:
        (str): Formatted timestamp.
    """

    tz = pytz.timezone(timezone)

    current_time_dt: datetime = datetime.now(tz)
    current_time: str = current_time_dt.strftime("%l:%M %p %B %d, %Y").strip()

    return current_time
